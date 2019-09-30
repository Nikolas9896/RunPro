var Race                =require("../models/race");
var Comment             =require("../models/comment");
//Middleware of all project
var middlewareObj = {};

//Check Races ownership
middlewareObj.checkRaceOwnership = (req, res, next) => {
   //is user logged in?
   if(req.isAuthenticated()){
               
       Race.findById(req.params.id, (err, foundRace) => {
           if(err) {
               res.redirect("back");
           } else {
               //does the user own the campground?
               if(foundRace.author.id.equals(req.user._id)){
                   next();
               } else {
                   res.redirect("back");
               }
           }
       });
   } else {
       res.redirect("back");
   }
}

//Check Comment Ownership
middlewareObj.checkCommentOwnership = (req, res, next) => {
    //is user logged in?
    if(req.isAuthenticated()){
                
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back");
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }


}

//is login?
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}



module.exports = middlewareObj;