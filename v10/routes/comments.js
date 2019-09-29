var express             = require("express");
var router              = express.Router({mergeParams: true});
var Race                = require("../models/race");
var Comment             = require("../models/comment");

// =====================
// COMMENTS ROUTES
// =====================

//ROUTE: Comments New
router.get("/new", isLoggin, (req, res) => {
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
//ROUTE: Comments Create
router.post("/", isLoggin, (req, res) => {
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
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
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

//EDIT Comment ROUTE
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {race_id: req.params.id, comment: foundComment});
        }
    })
});

router.put("/:comment_id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
           res.redirect("/races/" + req.params.id);
        }
    });
});


//FUNCTIONS Middleware
function isLoggin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports  = router;