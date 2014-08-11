var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});

function scrapeUsername() {
  var username = $("#username").text();
  server.emit('username', username);
}

function populateUsersCountries(countries) {
  var $countryHolder = $('.tweet_country_holder');
  for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var newCountry = "<div id='" + normalizeName(country) + "'>" +
    "<h2>" + country + "</h2><ul></ul></div>";
    $countryHolder.append(newCountry);
  }
}

function getUsersCountries() {
  server.on('username', function(data) {
    var countries = JSON.parse(data);
    //countries should be an array
    populateUsersCountries(countries);
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
  server.emit('country', country);
}

function normalizeName(name) {
  return name.split(" ").join("-");
}

// function populateCountryTweets() {

// }

// function tweetListener() {

// }

$(function() {
  scrapeUsername();
  getUsersCountries();
  submitListener();
  //populateCountryTweets();
  //tweetListener();
});