var Race                =require("../models/race");
var Comment             =require("../models/comment");
//Middleware of all project
var middlewareObj = {};

//Check Races ownership
middlewareObj.checkRaceOwnership = (req, res, next) => {
   //is user logged in?
   if(req.isAuthenticated()){
               
       Race.findById(req.params.id, (err, foundRace) => {
           if(err || !foundRace) {
            req.flash("error", "Race not found");
               res.redirect("back");
           } else {
               //does the user own the campground?
               if(foundRace.author.id.equals(req.user._id)){
                   next();
               } else {
                req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
       });
   } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
   }
}

//Check Comment Ownership
middlewareObj.checkCommentOwnership = (req, res, next) => {
    //is user logged in?
    if(req.isAuthenticated()){
                
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                req.flash("error", err);
                res.redirect("back");
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }


}

//is login?
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}



module.exports = middlewareObj;