require("dotenv").config();
var axios = require("axios");
var liri = require("./keys.js");
var moment = require("moment");
moment().format();
// var spotify = newSpotify(keys.spotify);
var nodeArgs = process.argv
var search= process.argv[2];
var artist = "";
var movieName = "";
var songName = "";
var movieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
var searchInput= "";

for (var i = 3; i < nodeArgs.length; i++){
        if (i > 3 && i < nodeArgs.length){
                searchInput = searchInput + "+" + nodeArgs[i];
        }
        else{
                searchInput += nodeArgs[i];
            }
        };
    console.log(searchInput);  

//appendFile()    
                
function concertThis (searchTerm){
    var artistQueryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    console.log(artistQueryURL);
    axios.get(artistQueryURL).then(
        function(response){
            var searchResult = (response.data);                       
            
            for (var i = 0; i < searchResult.length; i++){
                console.log(searchResult[i].venue.name + ", " + 
                    searchResult[i].venue.city + ", " + 
                    searchResult[i].venue.region + " on " +
                    moment(searchResult[i].datetime).format("MMM Do YY"));
            }; 
            //appendFile();       
        }
    ).catch(
        function(error){
            console.log(error);
        }
    )
        
};

// function movieThis (searchTerm){
// }


switch(search){
    case "concert-this":
        concertThis(searchInput);
        break;
    case "movie-this":
        break;
    case "spotify-this-song":
        break;
    default:
        console.log("default"); 
}
 //for the bonus read the file 