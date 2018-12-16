# LIRI-Node-App
The LIRI node app makes it possible to look up information for concerts, movies, and music tracks without the use of a browser. 

This CLI app runs from the terminal and access 3 different APIs.

First, by using the "movie-this <movie title>" command, a user may search the OMDB API for the movie information.
  
![movie-this](https://user-images.githubusercontent.com/43149867/50049720-44809680-00b1-11e9-9e13-95155fb03abe.png)


When no movie is specified, the app defaults to Mr. Nobody.


Second, a user may access the Bands in Town API to do a concert search for any given artist simply by using "concert-this <artist name>".

![concert-this](https://user-images.githubusercontent.com/43149867/50049741-8d384f80-00b1-11e9-8ad9-80fbd725aaf9.png)


Also, "spotify-this-song <song name>" will generate track information using the Spotify Web API. If no name is entered the default return is The Sign from Ace of Base. 
  
  ![spotify-this-song](https://user-images.githubusercontent.com/43149867/50049749-b48f1c80-00b1-11e9-8cd3-c0e82fc46940.png)
  
There is also a "do-what-it-says" function which reads a text file. Within the file is a command and search term. The function then accesses the specified API with the search term.

![do-what-it-says](https://user-images.githubusercontent.com/43149867/50049817-8e6a7c00-00b3-11e9-843d-c7c6d19c4d13.png)

