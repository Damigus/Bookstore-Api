const mongoose = require("mongoose");

const czytelnikSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Czytelnik", czytelnikSchema, "Czytelnicy");