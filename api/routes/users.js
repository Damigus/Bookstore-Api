const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");

// Zakładanie konta
router.post("/signup", (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ wiadomosc: "Email i hasło są wymagane" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ wiadomosc: err });

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash,
        });

        user
            .save()
            .then(() => res.status(201).json({ wiadomosc: "Dodano użytkownika" }))
            .catch((err) => res.status(500).json({ wiadomosc: "Błąd serwera", error: err }));
    });
});

// Logowanie
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ wiadomosc: "Email i hasło są wymagane" });
    }

    User.findOne({ email: email })
        .then((user) => {
            if (!user) return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return res.status(500).json({ wiadomosc: err });
                if (!result) return res.status(401).json({ wiadomosc: "Złe hasło" });

                const token = jwt.sign(
                    { user: user._id, email: user.email },
                    process.env.JWT_KEY,
                    { expiresIn: "1d" }
                );

                return res.status(200).json({ token: token });
            });
        })
        .catch((err) => res.status(500).json({ wiadomosc: "Błąd serwera", error: err }));
});

module.exports = router;
