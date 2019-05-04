function song() {

    spotify.search({ type: 'track', query: userSearch, limit:1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
  var songData = (data.tracks.items[0]); 
console.log(songData.album.artists)
  });
}