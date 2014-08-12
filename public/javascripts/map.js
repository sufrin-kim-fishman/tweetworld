var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});

var styling = [{"featureType":"water","elementType":"geometry","stylers":
  [{"color":"#0B3861"},{"lightness":25}]},
  {"featureType":"landscape","elementType":"geometry",
  "stylers":[{"color":"#00BFFF"},{"lightness":20}]},
  {"featureType":"road.highway","elementType":"geometry.fill",
  "stylers":[{"color":"#000000"},{"lightness":17}]},
  {"featureType":"road.highway","elementType":"geometry.stroke",
  "stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},
  {"featureType":"road.arterial","elementType":"geometry",
  "stylers":[{"color":"#000000"},{"lightness":18}]},
  {"featureType":"road.local","elementType":"geometry",
  "stylers":[{"color":"#000000"},{"lightness":16}]},
  {"featureType":"poi","elementType":"geometry",
  "stylers":[{"color":"#000000"},{"lightness":21}]},
  {"elementType":"labels.text.stroke",
  "stylers":[{"visibility":"on"},{"color":"#000000"},
  {"lightness":16}]},{"elementType":"labels.text.fill",
  "stylers":[{"saturation":36},{"color":"#FFFFFF"},{"lightness":40}]},
  {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
  {"featureType":"transit","elementType":"geometry",
  "stylers":[{"color":"#000000"},{"lightness":19}]},
  {"featureType":"administrative","elementType":"geometry.fill",
  "stylers":[{"color":"#000000"},{"lightness":20}]},
  {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}];

$(document).ready(function() {
  initialize();
});

function initialize() {
  var myLatlng = new google.maps.LatLng(25, 10);
  var icon = setIcon();
  var mapOptions = setMapOptions(myLatlng);
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  tweetListener(map, icon);
  google.maps.event.addDomListener(window, 'load', initialize);
}

function setIcon() {
  return {
    url: "../images/pink_dot_very_small.png",
    size: new google.maps.Size(20, 20)
  };
}

function setMapOptions(myLatlng) {
  return {
    zoom: 2,
    center: myLatlng,
    styles: styling
  };
}

function tweetListener(map, icon) {
  server.on('tweets', function(d) {
    console.log('hi');
    d = JSON.parse(d);
    console.log(d);
    d3.json(d, function(data) {
      D3Markers(d, data, map, icon);
    });
  });
}

function D3Markers(d, data, map, icon) {
  var tweetLatlng = new google.maps.LatLng(d.geo.coordinates[0], d.geo.coordinates[1]);
  console.log(tweetLatlng);
  var marker = setMarker(tweetLatlng, icon);
  marker.setMap(map);
  var contentString = d.text;
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  infowindow.open(map, marker);
  setTimeout(function(){infowindow.close();}, '6000');
}

function setMarker(tweetLatlng, icon) {
  return new google.maps.Marker({
    position: tweetLatlng,
    title:"Hello World!",
    icon: icon
  });
}