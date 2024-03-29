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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
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
    res.redirect("/races");
});

//FUNCTIONS Middleware
function isLoggin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;