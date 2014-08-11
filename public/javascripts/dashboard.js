var server = io.connect('http://localhost:8080/dashboard');
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
    var country = normalizeName($country);
    addNewCountry($country, country);
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

function tweetListener() {
  server.on('tweets', function(tweet) {
    tweet = JSON.parse(tweet);
    var normalizedCountry = normalizeName(tweet.place.country);
    if($("#" + normalizedCountry).length === 1) {
      insertTweet(tweet, normalizedCountry);
    }
  });
}

function addNewCountry($country, country) {
  if($("#" + country).length === 0) {
    var newCountry = "<div id='" + country + "'>" +
      "<h2>" + $country + "</h2><ul></ul></div>"
    $(".tweet_country_holder").append(newCountry);
  }
}

function insertTweet(tweet, country) {
  var $countryUl = $("#" + country + " ul");
  if  ($countryUl.children().length > 9) {
    $("#" + country +" li").last().remove();
  }
  $countryUl.prepend('<li>' + tweet.text + '</li>');
}

// function populateCountryTweets() {

// }

$(function() {
  getUsersCountries();
  sendUsername();
  submitListener();
  tweetListener();
  //populateCountryTweets();
});