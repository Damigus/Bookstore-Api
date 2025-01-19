const mongoose = require("mongoose");
const Czytelnik = require("../routes/models/czytelnik");

exports.czytelnicy_get_all = (req, res, next) => {
    Czytelnik.find()
        .then(czytelnicy => {
            res.status(200).json({
                message: "Lista wszystkich czytelników",
                czytelnicy: czytelnicy
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.czytelnicy_add_new = (req, res, next) => {
    const czytelnik = new Czytelnik({
        _id: new mongoose.Types.ObjectId(),
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        email: req.body.email
    });

    czytelnik.save()
        .then(result => {
            res.status(201).json({
                message: "Nowy czytelnik został dodany!",
                czytelnik: result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.czytelnicy_get_by_id = (req, res, next) => {
    const id = req.params.czytelnikId;
    Czytelnik.findById(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Szczegóły czytelnika o ID ${id}`,
                    czytelnik: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono czytelnika" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.czytelnicy_update = (req, res, next) => {
    const id = req.params.czytelnikId;
    const updatedFields = {
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        email: req.body.email
    };

    Czytelnik.findByIdAndUpdate(id, updatedFields, { new: true })
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Zaktualizowano czytelnika o ID ${id}`,
                    updatedCzytelnik: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono czytelnika" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.czytelnicy_delete = (req, res, next) => {
    const id = req.params.czytelnikId;
    Czytelnik.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.status(200).json({ message: `Usunięto czytelnika o ID ${id}` });
            } else {
                res.status(404).json({ message: "Nie znaleziono czytelnika" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};