require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv
var search= process.argv[2];
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
    // console.log(artistQueryURL);
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

function movieThis (searchTerm){
    var movieQueryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    axios.get(movieQueryURL).then(
        function(response){
            // console.log(response.data);
            var movie = response.data
            console.log(["Title: " + movie.Title, "Year: " + movie.Year, "Imdb Rating: " + movie.imdbRating,
            "Rotten Tomatoes Rating: " + movie.Ratings[1], "Country: " + movie.Country, 
            "Language: " + movie.Language,  "Plot: " + movie.Plot, "Actors: " + movie.Actors]);
        }
    ).catch(
        function(){
            axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
                function(response){
                    // console.log(response.data);
                    var movie = response.data
                    console.log(["Title: " + movie.Title, "Year: " + movie.Year, "Imdb Rating: " + movie.imdbRating,
                    "Rotten Tomatoes Rating: " + movie.Ratings[1], "Country: " + movie.Country, 
                    "Language: " + movie.Language,  "Plot: " + movie.Plot, "Actors: " + movie.Actors]);
                }
            )
        }
    )};

function spotifyThis (searchTerm){
    spotify
    .search({type: "track", query: searchTerm})
    .then(function(response){
        console.log(response.artists)
    })
    .catch(
        function(error){
            console.log(error);
        }
    )
}
// function runNode(textFileCommand, textFileSearch){
//     console.log("node liri.js" + " " + textFileCommand + " " + textFileSearch)
// }
function readRandom (){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log (error);
        }
        // console.log(data)
        var contentArr = data.split(",");
        // console.log(contentArr[1]);
        var searchCommand = contentArr[0];
        var searchQuery = contentArr[1];

        if (searchCommand = "spotify-this-song"){
            spotifyThis(searchQuery);
        }
        if (searchCommand = "movie-this"){
            movieThis(searchQuery);
        }
        if (searchCommand === "concert-this"){
            concertThis(searchQuery)
        }
        // runNode(searchCommand, searchQuery);
        //need to pull [0] and [1] from array and pass that through node function
    })
}

switch(search){
    case "concert-this":
        concertThis(searchInput);
        break;
    case "movie-this":
        movieThis(searchInput);
        break;
    case "spotify-this-song":
        spotifyThis(searchInput);
        break;
    case "do-what-it-says":
        readRandom();
        break;

    default:
        console.log("default")
};