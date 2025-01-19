const mongoose = require("mongoose")

const wypozyczenieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    czytelnik: { type: mongoose.Schema.Types.ObjectId, ref: "Czytelnik", required: true },
    ksiazka: { type: mongoose.Schema.Types.ObjectId, ref: "Ksiazka", required: true },
    dataWypozyczenia: { type: Date, required: true },
    dataZwrotu: { type: Date, required: true }
});

module.exports = mongoose.model("Wypozyczenie", wypozyczenieSchema, "Wypozyczenia");