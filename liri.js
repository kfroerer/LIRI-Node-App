require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv
var search = process.argv[2];
var searchInput = nodeArgs.slice(3).join("+");


function concertThis(searchTerm) {
    var concertArray = [];
    var artistQueryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios.get(artistQueryURL).then(
        function (response) {
            var searchResult = (response.data);
            //loop that logs every event listed
            for (var i = 0; i < searchResult.length; i++) {
                var concertData = [
                    searchResult[i].venue.name  + ", " + 
                    searchResult[i].venue.city  + ", " + 
                    searchResult[i].venue.region  + ", " + 
                    moment(searchResult[i].datetime).format("MMM Do YY")
                ].join(', ');

                concertArray.push(concertData);
            };
           var finalLog = concertArray.join(", " + "\n");
           console.log(finalLog);
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    )

};

function movieThis(searchTerm) {
    if (searchTerm.length > 0) {
        var movieQueryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
        axios.get(movieQueryURL).then(
            function (response) {
                var movie = response.data
                console.log(
                    "Title: " + movie.Title + "\n" +
                    "Year: " + movie.Year + "\n" +
                    "Imdb Rating: " + movie.imdbRating + "\n" +
                    "Rotten Tomatoes Rating: " + movie.Ratings[1] + "\n" +
                    "Country: " + movie.Country + "\n" +
                    "Language: " + movie.Language + "\n" +
                    "Plot: " + movie.Plot + "\n" +
                    "Actors: " + movie.Actors);
            }
        
        )}
        else {       
        //following will run if no search term is entered
           axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
                .then(
                    function (response) {
                        var movie = response.data
                        console.log(
                            "Title: " + movie.Title + "\n" +
                            "Year: " + movie.Year + "\n" +
                            "Imdb Rating: " + movie.imdbRating + "\n" +
                            "Rotten Tomatoes Rating: " + movie.Ratings[1] + "\n" +
                            "Country: " + movie.Country + "\n" +
                            "Language: " + movie.Language + "\n" +
                            "Plot: " + movie.Plot + "\n" +
                            "Actors: " + movie.Actors);
                    }
                )
        }
}

function spotifyThis(searchTerm) {
    if (searchTerm.length > 0) {
        spotify
            .search({ type: "track", query: searchTerm })
            .then(function (response) {
                var returnObj = response.tracks.items;
                console.log(
                    returnObj[0].artists[0].name + "\n" +
                    returnObj[0].name + "\n" +
                    returnObj[0].preview_url + "\n" +
                    returnObj[0].album.name
                );
            })
    }
    else {
        spotify.search({ type: "track", query: "The Sign" })
        .then(function (response) {
            var returnObj = response.tracks.items;
            console.log(
                returnObj[8].artists[0].name + "\n" +
                returnObj[8].name + "\n" +
                returnObj[8].preview_url + "\n" +
                returnObj[8].album.name
            );
        })
            .catch(function (error) {
                console.log(error);
            })
        }
}

    function readRandom() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var contentArr = data.split(",");
            var searchCommand = contentArr[0];
            var searchQuery = contentArr[1];

            if (searchCommand === "spotify-this-song") {
                spotifyThis(searchQuery);
            }
            if (searchCommand === "movie-this") {
                movieThis(searchQuery);
            }
            if (searchCommand === "concert-this") {
                concertThis(searchQuery)
            }
        })
    }

    switch (search) {
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