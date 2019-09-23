var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Race        = require("./models/race"),
    // Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    seedDB      = require("./seeds");
//seedDB - function for create DEMO RACE.
//seedDB();
mongoose.connect("mongodb://localhost:27017/run_pro", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
app.get("/races/:id/comments/new", (req, res) => {
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

app.listen(3000, () => {
    console.log("The RunPro Server has started!");
});