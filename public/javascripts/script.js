var server = io.connect(window.location.hostname);
server.on('error', function() {
  server.socket.connect();
});

function insertTweet(tweet, country) {
  var $countryUl = $("#" + country + " ul");
  if  ($countryUl.children().length > 9) {
    $("#" + country +" li").last().remove();
  }
  $countryUl.prepend('<li>' + tweet.text + '</li>');
}

function normalizeName(name) {
  return name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\']/g,"").split(" ").join("-");
}

function submitListener() {
  $("#submit").click(function(e) {
    var countryName = $("#country").val();
    var $country = states[countryName];
    var country = normalizeName($country);
    addNewCountry(country, countryName);
    e.preventDefault();
  });
}

function addNewCountry(country, countryName) {
  if($("#" + country).length === 0) {
    var newCountry = "<div id='" + country + "' class='col-md-4' style='background-color:white;border:2px;border-style:dashed;border-color:gray;border-radius:5%;margin:auto;float:left;'>" + 
      "<h2>" + countryName + "</h2>"+
      '<button type="button" class="delete">X</button>' +
      "<ul></ul></div>";
    $(".tweet_country_holder").append(newCountry);
  }
  removeCountry();
}

function removeCountry() {
  $(".delete").click(function(e) {
    $(this).parent().remove();
    e.preventDefault();
  });
}

function tweetListener() {
  server.on('tweets', function(data) {
    var tweet = JSON.parse(data);
    var normalizedCountry = normalizeName(tweet.place.country);
    if($("#" + normalizedCountry).length === 1) {
      insertTweet(tweet, normalizedCountry);
    }
  });
}

$(function(){
  submitListener();
  tweetListener();
});