const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//autoryzacja
const checkAuth = require("../routes/middleware/checkAuth")


//importuje kontroler
const CzytelnicyController = require("../controllers/czytelnicy");
const KsiazkiController = require("../controllers/ksiazki");
const WypozyczeniaController = require("../controllers/wypozyczenia");

// Router dla czytelników
router.get("/czytelnicy", CzytelnicyController.czytelnicy_get_all);
router.post("/czytelnicy", CzytelnicyController.czytelnicy_add_new);
router.get("/czytelnicy/:czytelnikId", CzytelnicyController.czytelnicy_get_by_id);
router.put("/czytelnicy/:czytelnikId", CzytelnicyController.czytelnicy_update);
router.delete("/czytelnicy/:czytelnikId", CzytelnicyController.czytelnicy_delete);

// Router dla książek
router.get("/ksiazki", KsiazkiController.ksiazki_get_all);
router.post("/ksiazki", KsiazkiController.ksiazki_add_new);
router.get("/ksiazki/:ksiazkaId", KsiazkiController.ksiazki_get_by_id);
router.put("/ksiazki/:ksiazkaId", KsiazkiController.ksiazki_update);
router.delete("/ksiazki/:ksiazkaId", KsiazkiController.ksiazki_delete);

// Router dla wypożyczeń
router.get("/wypozyczenia", WypozyczeniaController.wypozyczenia_get_all);
router.post("/wypozyczenia", WypozyczeniaController.wypozyczenia_add_new);
router.get("/wypozyczenia/:wypozyczenieId", WypozyczeniaController.wypozyczenia_get_by_id);
router.put("/wypozyczenia/:wypozyczenieId", WypozyczeniaController.wypozyczenia_update);
router.delete("/wypozyczenia/:wypozyczenieId", WypozyczeniaController.wypozyczenia_delete);

module.exports = router;
