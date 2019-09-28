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


var commentRoutes           = require("./routes/comments"),
    raceRoutes              = require("./routes/races"),
    indexRoutes             = require("./routes/index");

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

//currentUser provider
app.use((req, res, next) => {
    res.locals.currentUser  =   req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/races", raceRoutes);
app.use("/races/:id/comments", commentRoutes);


//LAST LISTENER
app.listen(3000, () => {
    console.log("The RunPro Server has started!");
});