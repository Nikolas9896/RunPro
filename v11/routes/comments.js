var express             = require("express");
var router              = express.Router({mergeParams: true});
var Race                = require("../models/race");
var Comment             = require("../models/comment");
var middleware          = require("../middleware");
// =====================
// COMMENTS ROUTES
// =====================

//ROUTE: Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    //find race by id
    Race.findById(req.params.id, (err, race) => {
        if(err){
            req.flash("error", err);
            res.redirect("/races");
        } else {
            // Show Comments FORM
            res.render("comments/new", {race: race});
        }
    });
    
});
//ROUTE: Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    //lookup race using ID
    Race.findById(req.params.id, (err, race) => {
        if(err){
            req.flash("error", err);
            res.redirect("/races");
        } else {
     //create new comment
     Comment.create(req.body.comment, (err, comment) => {
        if(err){
            req.flash("error", err);
            res.redirect("/races");
        } else {
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            //connect new comment to race
            race.comments.push(comment);
            race.save();
            req.flash("success", "Your Comment Added!");
            //redirect race show page
            res.redirect("/races/" + race._id);  
        }
     });
     
    
        }
    });
    
});

//EDIT Comment ROUTE
router.get("/:comment_id/edit", middleware.checkRaceOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {race_id: req.params.id, comment: foundComment});
        }
    })
});
//UPDATE Comment ROUTE
router.put("/:comment_id", middleware.checkRaceOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            req.flash("error", err);
            res.redirect("back");
        } else {
            req.flash("success", "Your Comment Updated!");
            res.redirect("/races/" + req.params.id);
        }
    });
});

//DESTROY REMOVE Delete Comment ROUTE
router.delete("/:comment_id", middleware.checkRaceOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deleteComment) => {
        if(err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            req.flash("success", "Your Comment Deleted!");
            res.redirect("/races/" + req.params.id);
        }
    });

});

module.exports  = router;