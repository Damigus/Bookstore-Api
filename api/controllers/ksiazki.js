const Ksiazka = require("../routes/models/ksiazka");
const mongoose = require("mongoose");
exports.ksiazki_get_all = (req, res, next) => {
    Ksiazka.find()
        .then(ksiazki => {
            res.status(200).json({
                message: "Lista wszystkich książek",
                ksiazki: ksiazki
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.ksiazki_add_new = (req, res, next) => {
    const ksiazka = new Ksiazka({
        _id: new mongoose.Types.ObjectId(),
        tytul: req.body.tytul,
        autor: req.body.autor,
        gatunek: req.body.gatunek
    });

    ksiazka.save()
        .then(result => {
            res.status(201).json({
                message: "Nowa książka została dodana!",
                ksiazka: result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.ksiazki_get_by_id = (req, res, next) => {
    const id = req.params.ksiazkaId;
    Ksiazka.findById(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Szczegóły książki o ID ${id}`,
                    ksiazka: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono książki" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.ksiazki_update = (req, res, next) => {
    const id = req.params.ksiazkaId;
    const updatedFields = {
        tytul: req.body.tytul,
        autor: req.body.autor,
        gatunek: req.body.gatunek
    };

    Ksiazka.findByIdAndUpdate(id, updatedFields, { new: true })
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Zaktualizowano książkę o ID ${id}`,
                    updatedKsiazka: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono książki" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.ksiazki_delete = (req, res, next) => {
    const id = req.params.ksiazkaId;
    Ksiazka.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.status(200).json({ message: `Usunięto książkę o ID ${id}` });
            } else {
                res.status(404).json({ message: "Nie znaleziono książki" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};