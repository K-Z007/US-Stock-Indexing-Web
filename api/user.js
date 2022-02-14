const express = require("express");
const User = require("../models/User");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    console.log("getting user data!");

    if (!req.user) {
        res.send({ error: "not authenticated" });
        return;
    }
    res.status(200).json({
        userId: req.user._id,
        username: req.user.username,
        isAuthenticated: req.isAuthenticated(),
    });
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body.user;

        const newUser = new User({ email, username });
        const registeredNewUser = await User.register(newUser, password);

        res.status(200).end();
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    try {
        res.status(200).json({
            userId: req.user._id,
            username: req.user.username,
            isAuthenticated: req.isAuthenticated(),
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.clearCookie("connect.sid");
        // Don't redirect, just print text
        res.send("Logged out");
    });
});

module.exports = router;
