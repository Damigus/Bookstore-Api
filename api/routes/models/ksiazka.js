const mongoose = require("mongoose");

const ksiazkaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tytul: { type: String, required: true },
    autor: { type: String, required: true },
    gatunek: { type: String, required: true }
});

module.exports = mongoose.model("Ksiazka", ksiazkaSchema, "Ksiazki");
