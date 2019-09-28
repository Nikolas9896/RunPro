// =====================
// COMMENTS ROUTES
// =====================
router.get("/races/:id/comments/new", isLoggin, (req, res) => {
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

router.post("/races/:id/comments", isLoggin, (req, res) => {
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

module.exports  = router;