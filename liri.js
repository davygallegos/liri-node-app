require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require ("fs");
// var music = require ("./spotify.js");
// var band = require ("./bands.js");
// var movies = require ("./omdb.js");
// var what = require ("./whatItSays.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var queryPhrase = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");

switch (queryPhrase) {
    case "spotify-this-song":
        song()
        // console.log("spotify response")
        break;

    case "concert-this":
        searchBandsInTown()
        // console.log("band  in town locator")
        break;

    case "movie-this":
        movie()
        // console.log("OMDB response")
        break;

    case "do-what-its-says":
    random()
        console.log("fs response")
}

//Spotify query
function song() {

    spotify.search({ type: 'track', query: userSearch, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data)
        var songData = data.tracks.items[0];
        // console.log("Data" , data.tracks.items[0])
        console.log("Artist Name: ", songData.album.artists[0].name)
        console.log("Song Name: ", songData.name)
        console.log("Album Name: ", songData.album.name)
    });
};

//Band in Town query
function searchBandsInTown() {
        var queryUrl = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    
        // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);
    
        axios.get(queryUrl).then(
            function (response) {
                    console.log("Name of Venue: " + response.data[0].venue.name);
                    console.log("Venue location: " + response.data[0].venue.city);
                    console.log("Date of Concert: " + response.data[0].datetime);

   
            }
        );
    }

//OMDB function
function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            // console.log("Rotten Tomatoes rating: " + response.data.tomatoRating);
            console.log("Country: " + response.data.Country);
            console.log("Movie Actors: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Movie Actors: " + response.data.Actors);


            // console.log(response);

        }
    );
}
function random(){
fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  
  });
}

