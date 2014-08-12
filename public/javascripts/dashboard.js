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
    "<h2>" + country + "</h2><ul></ul>" +
    '<button type="button" class="ex_button">X</button>' +
    "</div>";
    $countryHolder.append(newCountry);
    $countryHolder.append($(".delete"));
  }
}

// function removeCountry() {
//   $(".delete").click(function(e) {
//     e.preventDefault();
//   });

function submitListener() {
  $("#submit").click(function(e) {
    var $country = $("#country").val();
    var country = normalizeName($country);
    addNewCountry($country, country);
    persistCountry($country);
    e.preventDefault();
  });
}

function addNewCountry($country, country) {
  if($("#" + country).length === 0) {
    var newCountry = "<div id='" + country + "'>" +
      "<h2>" + $country + "</h2><ul></ul></div>"
    $(".tweet_country_holder").append(newCountry);
  }
}

function persistCountry(country) {
  var countryObj = {
    name: country,
    user: scrapeUsername()
  };
  server.emit('country', JSON.stringify(countryObj));
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