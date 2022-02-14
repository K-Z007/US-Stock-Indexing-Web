const express = require("express");
const User = require("../models/User");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    console.log("getting user data!");

    // if session cookies has no authentication then means not logged in thus not able to fetch the data;
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
    // console.log(req.body);
    try {
        const { username, password, email } = req.body.user;
        // console.log(username + "   " + password);
        const newUser = new User({ email, username });
        const registeredNewUser = await User.register(newUser, password);
        // console.log(registeredNewUser);
        res.status(200).end();
    } catch (err) {
        // console.log("err:");
        // console.log(err);
        res.status(400).json({ error: err });
        // res.status(400).send(err); // send() or json() both are fine here;
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    // console.log(req.session);
    // console.log(req.session.passport.user);

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

// router.post("/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) throw Error("not match");
//         if (!user) res.send("No User Exists");
//         else {
//             req.logIn(user, (err) => {
//                 if (err) throw err;
//                 res.status(200).json({
//                     userId: req.user._id,
//                     username: req.user.username,
//                     isAuthenticated: req.isAuthenticated(),
//                 });
//             });
//         }
//     })(req, res, next);
// });

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.clearCookie("connect.sid");
        // Don't redirect, just print text
        res.send("Logged out");
    });
});

module.exports = router;
