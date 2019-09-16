var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/run_pro");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

var raceSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Race = mongoose.model("Race", raceSchema);
//Create Run Race in DB
/*Race.create({
    name: "Run by Run",
    image: "https://runstyle.net/wp-content/uploads/2019/08/1200h500px-1200x480.jpg"
}, function(err, race){
    if(err){
        console.log(err);
    } else {
        console.log("NEWLY CREATED CAMPGROUD: ");
        console.log(race);
    }
});
*/
app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/races", (req, res) => {
    //Get all races from DB
    Race.find({}, function(err, allRaces){
        if(err){
            console.log(err);
        } else {
            res.render("races", {races: allRaces});
        }
    });

    //res.render("races", {races: races});
});

app.post("/races", (req, res) => {
    //get data from form and add to races array
    var name = req.body.name;
    var image = req.body.image;
    var newRaces = {name: name, image: image}
    races.push(newRaces);
    //redirect to races
    res.redirect("/races");
});

app.get("/races/new", (req, res) => {
    res.render("new");
});


app.listen(3000, () => {
    console.log("The RunPro Server has started!");
});