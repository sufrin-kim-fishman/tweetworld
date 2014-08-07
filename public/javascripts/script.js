var server = io.connect('http://localhost:8080');
server.on('error', function() {
  server.socket.connect();
});
var countriesToShow = [];

function insertTweet(tweet, country) {
  var $countryUl = $("#" + country + " ul");
  if  ($countryUl.children().length > 9) {
    $("#" + country +" li").last().remove();
  }
 $countryUl.prepend('<li>' + tweet.text + '</li>');
}

function normalizeName(name) {
  return name.split(" ").join("-");
}

function submitListener() {
  $("#submit").click(function(e) {
    var $country = $("#country").val();
    var country = normalizeName($country);
    countriesToShow.push(country);
    addNewCountry($country, country);
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

(function tweetListener() {
  server.on('tweets', function(data) {
    data = JSON.parse(data);
    var normalizedCountry = normalizeName(data.place.country);
    if(countriesToShow.indexOf(normalizedCountry) >= 0) {
      insertTweet(data, normalizedCountry);
    }
  });
})();

$(function(){
  submitListener();
});