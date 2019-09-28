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

   
});

//CREATE NEW RACE to DB
router.post("/", isLoggin, (req, res) => {
    //get data from form and add to races array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRaces = {name: name, image: image, description: description, author: author}
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
router.get("/new", isLoggin, (req, res) => {
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

// EDIT Race ROUTE
router.get("/:id/edit" , (req, res) => {
    Race.findById(req.params.id, (err, foundRace) => {
        if(err) {
            res.redirect("/races");
        } else {
            res.render("races/edit", {race: foundRace});
        }
    });
    
});
// UPDATE Race ROUTE
router.put("/:id", (req, res) => {
   //find and update the correct race
    Race.findByIdAndUpdate(req.params.id, req.body.race, (err, updatedRace) => {
        if(err){
            console.log(err);
            res.redirect("/races");
        } else {
            res.redirect("/races/" + updatedRace._id);
        }
   });
        //redirect somewhere(show page)
});
//FUNCTIONS Middleware
function isLoggin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports  = router;