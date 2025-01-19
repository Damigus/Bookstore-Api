const Wypozyczenie = require("../routes/models/wypozyczenie");
const mongoose = require("mongoose");
exports.wypozyczenia_get_all = (req, res, next) => {
    Wypozyczenie.find()
        .populate("czytelnik", "imie nazwisko email")
        .populate("ksiazka", "tytul autor")
        .then(wypozyczenia => {
            res.status(200).json({
                message: "Lista wszystkich wypożyczeń",
                wypozyczenia: wypozyczenia
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.wypozyczenia_add_new = (req, res, next) => {
    const wypozyczenie = new Wypozyczenie({
        _id: new mongoose.Types.ObjectId(),
        czytelnik: req.body.czytelnikId,
        ksiazka: req.body.ksiazkaId,
        dataWypozyczenia: req.body.dataWypozyczenia,
        dataZwrotu: req.body.dataZwrotu
    });

    wypozyczenie.save()
        .then(result => {
            res.status(201).json({
                message: "Nowe wypożyczenie zostało dodane!",
                wypozyczenie: result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.wypozyczenia_get_by_id = (req, res, next) => {
    const id = req.params.wypozyczenieId;
    Wypozyczenie.findById(id)
        .populate("czytelnik", "imie nazwisko email")
        .populate("ksiazka", "tytul autor")
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Szczegóły wypożyczenia o ID ${id}`,
                    wypozyczenie: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono wypożyczenia" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.wypozyczenia_update = (req, res, next) => {
    const id = req.params.wypozyczenieId;
    const updatedFields = {
        czytelnik: req.body.czytelnikId,
        ksiazka: req.body.ksiazkaId,
        dataWypozyczenia: req.body.dataWypozyczenia,
        dataZwrotu: req.body.dataZwrotu
    };

    Wypozyczenie.findByIdAndUpdate(id, updatedFields, { new: true })
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: `Zaktualizowano wypożyczenie o ID ${id}`,
                    updatedWypozyczenie: result
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono wypożyczenia" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.wypozyczenia_delete = (req, res, next) => {
    const id = req.params.wypozyczenieId;
    Wypozyczenie.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.status(200).json({ message: `Usunięto wypożyczenie o ID ${id}` });
            } else {
                res.status(404).json({ message: "Nie znaleziono wypożyczenia" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};