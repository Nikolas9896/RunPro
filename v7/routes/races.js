var express             = require("express");
var router              = express.Router();
var Race                = require("../models/race");


//INDEX - show all races
router.get("/", (req, res) => {
    req.user
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
router.post("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("races/new");
});
//SHOW - show race page.
router.get("/:id", (req, res) => {
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

module.exports  = router;