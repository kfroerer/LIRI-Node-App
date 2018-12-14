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
var searchInput = "";

//loop that checks for search terms longer than one word
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        searchInput = searchInput + "+" + nodeArgs[i];
    }
    else {
        searchInput += nodeArgs[i];
    }
};
// not working properly... need to pass through several things... not sure how
function append(text) {
    fs.appendFile("log.txt", text, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added");
        }
    });

}

//have results go to an array, turn into string for each venue  
// var string = Array.join(", ");
// string + "\n";
// fileappend(string)
// then split on new lin

function concertThis(searchTerm) {
    var concertArray = [];
    var artistQueryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios.get(artistQueryURL).then(
        function (response) {
            var searchResult = (response.data);
            //loop that logs every event listed
            for (var i = 0; i < searchResult.length; i++) {
                // console.log(
                var venue = searchResult[i].venue.name; 
                var city =  searchResult[i].venue.city;
                var region = searchResult[i].venue.region;
                var date = moment(searchResult[i].datetime).format("MMM Do YY");
            
            concertArray.push(venue + ", " + city + ", " + region + ", " + date);
            };
            console.log(concertArray);
            // var string = concertArray.join(", ");
            // string + "\n"
            append(concertArray);
            // // append(searchResult[i].venue.name);
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    )

};

function movieThis(searchTerm) {
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
        //following will run if no search term is entered        
    ).catch(
        function () {
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
    )
};

function spotifyThis(searchTerm) {
    if (searchTerm.length > 0) {
        spotify
            .search({ type: "track", query: searchTerm })
            .then(function (response) {
                var returnObj = response.tracks.items;
                console.log(returnObj[0].artists[0].name);
                console.log(
                    returnObj[0].artists[0].name + "\n" +
                    returnObj[0].name + "\n" +
                    returnObj[0].preview_url + "\n" +
                    returnObj[0].album.name
                );
            })
    }
    else {
        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
            .then(function (response) {
                var returnObj = response.tracks;
                console.log(returnObj[0].artists[0].name);
                console.log(
                    returnObj[0].artists[0].name + "\n" +
                    returnObj[0].name + "\n" +
                    returnObj[0].preview_url + "\n" +
                    returnObj[0].album.name
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