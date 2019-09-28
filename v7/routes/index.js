//ROUTES
app.get("/", (req, res) => {
    res.render("landing");
});


//=============
// AUTH ROUTES
//=============

//show register form
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
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
app.get("/login", (req, res) => {
    res.render("login");
});

//handling login logc

app.post("/login", passport.authenticate("local", {
    successRedirect: "/races",
    failureRedirect: "/login"   
}), (req, res) => {
    
});

// logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/races");
});

//FUNCTIONS
function isLoggin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};