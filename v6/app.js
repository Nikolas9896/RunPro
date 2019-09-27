var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    Race                    = require("./models/race"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");
//seedDB - function for create DEMO RACE.
//seedDB();
mongoose.connect("mongodb://localhost:27017/run_pro", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "My son is the best and the cutest man in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//ROUTES
app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX - show all races
app.get("/races", (req, res) => {
    //Get all races from DB
    Race.find({}, function(err, allRaces){
        if(err){
            console.log(err);
        } else {
            res.render("races/index", {races: allRaces});
        }
    });

    //res.render("races", {races: races});
});
//CREATE NEW RACE to DB
app.post("/races", (req, res) => {
    //get data from form and add to races array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newRaces = {name: name, image: image, description: description}
    //Create a new Race and save to DB
    Race.create(newRaces, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to races
            res.redirect("/races");
        }
    });
});
//NEW - show form to create new race
app.get("/races/new", (req, res) => {
    res.render("races/new");
});
//SHOW - show race page.
app.get("/races/:id", (req, res) => {
    //find the race with provide id
    Race.findById(req.params.id).populate("comments").exec(function(err, foundRace){
        if(err)
        {
            console.log(err);
        } else {
            //render show template with the race
            res.render("races/show", {race: foundRace});
        }
    });
    
});
// =====================
// COMMENTS ROUTES
// =====================
app.get("/races/:id/comments/new", isLoggin, (req, res) => {
    //find race by id
    Race.findById(req.params.id, (err, race) => {
        if(err){
            console.log(err);
        } else {
            // Show Comments FORM
            res.render("comments/new", {race: race});
        }
    });
    
});

app.post("/races/:id/comments", (req, res) => {
    //lookup race using ID
    Race.findById(req.params.id, (err, race) => {
        if(err){
            console.log(err);
            res.redirect("/races");
        } else {
     //create new comment
     Comment.create(req.body.comment, (err, comment) => {
        if(err){
            console.log(err);
        } else {
      //connect new comment to race
            race.comments.push(comment);
            race.save();
            //redirect race show page   
            res.redirect("/races/" + race._id);  
        }
     });
     
    
        }
    });
    
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
    res.send("Login logic!");
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

//LAST LISTENER
app.listen(3000, () => {
    console.log("The RunPro Server has started!");
});