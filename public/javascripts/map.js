// $(document).ready(function() {
// 	initialize();
// });

// function initialize() {
//     var mapOptions = {
// 	    center: new google.maps.LatLng(25, 10),
// 		zoom: 2
// 	};
// 	var map = new google.maps.Map(document.getElementById("map-canvas"),
//     							mapOptions);
// };
// google.maps.event.addDomListener(window, 'load', initialize);

// tweetListener();
// submitListener();

// function addADot($country, country) {
//   if($("#" + country).length === 0) {

//     var newCountry = "<div id='" + country + "'>" + 
//       "<h2>" + $country + "</h2><ul></ul></div>"
//     $(".tweet_country_holder").append(newCountry);
//   }
// }
var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});

$(document).ready(function() {
  initialize();
});

function initialize() {
  var myLatlng = new google.maps.LatLng(25, 10);
  var mapOptions = {
  zoom: 2,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  server.on('tweets', function(d) {
    console.log('hi');
    d = JSON.parse(d);
    console.log(d);
    d3.json(d, function(data) {
      console.log("HI" + d.text);
      var tweetLatlng = new google.maps.LatLng(d.coordinates.coordinates[0], d.coordinates.coordinates[1]);
      console.log(tweetLatlng);
      var marker = new google.maps.Marker({
        position: tweetLatlng,
        title:"Hello World!"
      })
      marker.setMap(map);
      // google.maps.event.addDomListener(marker, 'click', function() {
        
      // })
    })
  })
};