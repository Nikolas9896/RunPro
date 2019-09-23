//SCHEMA SETUP
var mongoose    =require("mongoose");

var raceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Race", raceSchema);