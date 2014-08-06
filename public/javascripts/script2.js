$(function(){
  var server = io.connect('http://localhost:8080');
  countriesToShow = [];
  var country;
  $("#submit").click(function(e) {
  	  country = normalizeName($("#country").val());
      countriesToShow.push(country);
      console.log(country);
      console.log(countriesToShow);
  	  e.preventDefault();
  });
  server.on('tweets', function(data) {
    normalizedCountry = normalizeName(data.place.country);
    if(countriesToShow.indexOf(normalizedCountry) >= 0) {
      if($("#" + normalizedCountry).length === 0) {
      	$(".tweet_country_holder").append("<div id='" + normalizedCountry + "'>" + 
          "<h2>" + data.place.country + "</h2><ul></ul></div>");
      }
      insertTweet(data, normalizedCountry);
    }
  });
});

function insertTweet(tweet, country) {
  if  ($("#" + country + " ul").children().length > 9) {
    console.log("deleting top tweet...");
    console.log($("#" + country +" li").last());
    $("#" + country +" li").last().remove();
    console.log("deleted top tweet");
  }
 $("#" + country + " ul").prepend('<li>' + tweet.text + '</li>');
}

function normalizeName(name) {
  return name.replace(" ", "-");
}
