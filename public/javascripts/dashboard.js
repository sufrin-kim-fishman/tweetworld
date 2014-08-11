var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});

function scrapeUsername() {
  return $("#username").text();
}

function sendUsername() {
  server.emit('username', scrapeUsername());
}

function getUsersCountries() {
  server.on('username', function(countries) {
    populateUsersCountries(countries);
  });
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

function submitListener() {
  $("#submit").click(function(e) {
    var $country = $("#country").val();
    persistCountry($country);
    e.preventDefault();
  });
}

function persistCountry(country) {
  var countryObj = {
    name: country,
    user: scrapeUsername()
  };
  server.emit('country', JSON.stringify(countryObj));
}

function normalizeName(name) {
  return name.split(" ").join("-");
}

// function populateCountryTweets() {

// }

// function tweetListener() {

// }

$(function() {
  getUsersCountries();
  sendUsername();
  submitListener();
  //populateCountryTweets();
  //tweetListener();
});