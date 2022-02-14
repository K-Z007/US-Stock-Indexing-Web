const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const companiesRouter = require("./api/companies");
const userRouter = require("./api/user");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// cors to add client side origin so as allowing cross-origin access: if not adding origin inside cors() then it is would be treat "*" meaning allowing all different origins;
app.use(
    cors({
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// Serve static assets if in production:
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const sessionConfig = {
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
// following is the configs for passport module:
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// DB connection
async function connectMongoMain() {
    await mongoose.connect(process.env.COMPANYRATOR_DB_URI || "mongodb://localhost:27017/companydata");
    console.log("mongodb connection successful!");
}
// connect to mongodb
connectMongoMain().catch((err) => console.log("connection failed " + err));

// import routers

app.use("/api/companies", companiesRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log("Servier is running on PORT " + port);
});
