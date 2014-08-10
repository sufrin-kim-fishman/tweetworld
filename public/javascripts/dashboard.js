var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});

function scrapeUsername() {
  var username = $("#username").text();
  server.emit('username', JSON.stringify(username));
}

function getUsername() {
  server.on('username', function(data) {
    var username = JSON.parse(data);
    populateUsersCountries(username);
  });
}

function submitListener() {
  $("#submit").click(function(e) {
    var $country = $("#country").val();
    persistCountry($country);
    e.preventDefault();
  });
}

function persistCountry(country) {

}

function populateUsersCountries(username) {
  var countries = getUsersCountries();
}

function getUsersCountries() {
  var countries;
  server.on('username', function(data) {
    countries = JSON.parse(data);
  });
  return countries;
}

// function populateCountryTweets() {

// }

// function tweetListener() {

// }

$(function() {
  scrapeUsername();
  getUsername();
  submitListener();
  //populateCountryTweets();
  //tweetListener();
});