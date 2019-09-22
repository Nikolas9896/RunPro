var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/run_pro", {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

var raceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Race = mongoose.model("Race", raceSchema);
//Create Run Race in DB
// Race.create({
//     name: "Run by Run",
//     image: "https://runstyle.net/wp-content/uploads/2019/08/1200h500px-1200x480.jpg",
//     description: "This is amazing challenge for all runners!"
// }, function(err, race){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUD: ");
//         console.log(race);
//     }
// });

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
            res.render("index", {races: allRaces});
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
    res.render("new");
});
//SHOW - show race page.
app.get("/races/:id", (req, res) => {
    //find the race with provide id
    Race.findById(req.params.id, function(err, foundRace){
        if(err)
        {
            console.log(err);
        } else {
            //render show template with the race
            res.render("show", {race: foundRace});
        }
    });
    
});




app.listen(3000, () => {
    console.log("The RunPro Server has started!");
});