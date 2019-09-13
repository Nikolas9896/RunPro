var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var races = [
    {name: "Half Marathon", image: "https://runstyle.net/wp-content/uploads/2017/12/race_nation_400-257x257.png"},
    {name: "10th Kilometers", image: "https://runstyle.net/wp-content/uploads/2018/05/npchernigiv-260x260.png"},
    {name: "Run by Run", image: "https://runstyle.net/wp-content/uploads/2019/08/1200h500px-1200x480.jpg"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/races", (req, res) => {
   
    res.render("races", {races: races});
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