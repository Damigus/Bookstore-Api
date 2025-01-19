//zmienne środowiskowe
require('dotenv').config({ path: './config.env' });

//importuje express
const express = require("express")

// tworzę instancje expressa
const app = express()

//połączenie z bazą danych
const mongoose = require("mongoose");
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDBName = process.env.MONGO_DB_NAME;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoAuth = process.env.MONGO_AUTH;
const mongoURI = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}.${mongoAuth}.mongodb.net/${mongoDBName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)

//logger
const morgan = require("morgan")
app.use(morgan("dev"))

// parsowanie body
const bodyParser = require("body-parser")
app.use(bodyParser.json())  // od tej pory w req.body mam informacje z body

// importuje routy
const userRoutes = require("./api/routes/users");
const Routy = require("./api/routes/routy");

app.use(Routy);
app.use(userRoutes);

// Wywołuje się, gdy nie odnajdzie routu
app.use((req, res, next) => {
    res.status(404).json({ wiadomość: "Nie odnaleziono" });
});

module.exports = app;
