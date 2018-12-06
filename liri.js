require("dotenv").config();
var axios = require("axios");
var liri = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv
var artist = "";
var movieName = "";
var songName = "";
var artistQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
var movieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


function concertThis(){
for (var i = 2; i < nodeArgs.length; i++){
    if (i > 2 && i < nodeArgs.length){
        artist = artist + "+" + nodeArgs[i];

}
else{
    artist += nodeArgs[i];
}
}