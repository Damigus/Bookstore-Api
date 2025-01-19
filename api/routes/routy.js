const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Autoryzacja
const checkAuth = require("../routes/middleware/checkAuth");

// Importuje kontrolery
const CzytelnicyController = require("../controllers/czytelnicy");
const KsiazkiController = require("../controllers/ksiazki");
const WypozyczeniaController = require("../controllers/wypozyczenia");

// Router dla czytelników
router.get("/czytelnicy", checkAuth, CzytelnicyController.czytelnicy_get_all);
router.post("/czytelnicy", checkAuth, CzytelnicyController.czytelnicy_add_new);
router.get("/czytelnicy/:czytelnikId", checkAuth, CzytelnicyController.czytelnicy_get_by_id);
router.put("/czytelnicy/:czytelnikId", checkAuth, CzytelnicyController.czytelnicy_update);
router.delete("/czytelnicy/:czytelnikId", checkAuth, CzytelnicyController.czytelnicy_delete);

// Router dla książek
router.get("/ksiazki", checkAuth, KsiazkiController.ksiazki_get_all);
router.post("/ksiazki", checkAuth, KsiazkiController.ksiazki_add_new);
router.get("/ksiazki/:ksiazkaId", checkAuth, KsiazkiController.ksiazki_get_by_id);
router.put("/ksiazki/:ksiazkaId", checkAuth, KsiazkiController.ksiazki_update);
router.delete("/ksiazki/:ksiazkaId", checkAuth, KsiazkiController.ksiazki_delete);

// Router dla wypożyczeń
router.get("/wypozyczenia", checkAuth, WypozyczeniaController.wypozyczenia_get_all);
router.post("/wypozyczenia", checkAuth, WypozyczeniaController.wypozyczenia_add_new);
router.get("/wypozyczenia/:wypozyczenieId", checkAuth, WypozyczeniaController.wypozyczenia_get_by_id);
router.put("/wypozyczenia/:wypozyczenieId", checkAuth, WypozyczeniaController.wypozyczenia_update);
router.delete("/wypozyczenia/:wypozyczenieId", checkAuth, WypozyczeniaController.wypozyczenia_delete);

module.exports = router;
