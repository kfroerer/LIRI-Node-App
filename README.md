# LIRI-Node-App
The LIRI node app makes it possible to look up information for concerts, movies, and music tracks without the use of a browser. 

This CLI app runs from the terminal and access 3 different APIs.

First, by using the "movie-this <movie title>" command, a user may search the OMDB API for the movie information.


When no movie is specified, the app defaults to Mr. Nobody.


Second, a user may access the Bands in Town API to do a concert search for any given artist simply by using "concert-this <artist name>".


Lastly, "spotify-this-song <song name>" will generate track information using the Spotify Web API. If no name is entered the default return is The Sign from Ace of Base. 