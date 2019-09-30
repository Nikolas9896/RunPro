var express             = require("express");
var router              = express.Router();
var passport            = require("passport");
var User                = require("../models/user");

//ROUTES
//ROUTE: ROOT
router.get("/", (req, res) => {
    res.render("landing");
});


//=============
// AUTH ROUTES
//=============

//show register form
router.get("/register", (req, res) => {
    res.render("register");
});

//handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "You Are Registered! Welcome to RunPRO!");
            res.redirect("/races");
        });
    });
});

//show login form
router.get("/login", (req, res) => {
    res.render("login");
});

//handling login logc
router.post("/login", passport.authenticate("local", {
    successRedirect: "/races",
    failureRedirect: "/login"   
}), (req, res) => {
    
});

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/races");
});

module.exports = router;