module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        console.log("Please login first");
        return res.status(400).json({ messange: "Login is required" });
    }
    next();
};
