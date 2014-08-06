$(function(){
  var server = io.connect('http://localhost:8080');
  countriesToShow = [];
  var country;
  $("#submit").click(function(e) {
  	console.log("hi");
  	  country = $("#country").val();
      countriesToShow.push(country);
  	  e.preventDefault();
  });
  server.on('tweets', function(data) {
    if(countriesToShow.indexOf(country) >= 0) {
      if($("#" + country).length === 0) {
      	$(".tweet_country_holder").append("<div id='"+ country +"'><ul></ul></div>");
      }
      insertTweet(data, country);
    }
  });
});



function insertTweet(tweet, country) {
 if  ($("#" + country +" > li").length > 9) {
  console.log("deleting top tweet...");
  console.log($("#" + country +" li").last());
  $("#" + country +" li").last().remove();
  console.log("deleted top tweet");
}
//  $("#" + country).prepend('<li>' + tweet.text + '</li>');
 $("#" + country).prepend('<li>' + tweet.text + '</li>');
}




