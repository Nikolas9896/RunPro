var express = require("express");
var app = express();


app.get("/", (req, res) => {

    res.send("The RUN PRO STARTED!");

});

app.listen(3000, () =>{
    console.log("The RunPro Server has started!");
});