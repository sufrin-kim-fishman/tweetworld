$(function(){
  var server = io.connect('http://localhost:8080');
  var country;
  $("#submit").click(function(e) {
  	console.log("hi");
  	country = $("#country").val();
  	e.preventDefault();
  });
  server.on('tweets', function(data) {
    if(country === data.place.country) {
    	if($("#country").length === 0) {
    		$(".tweet_country_holder").append("<div id='"+ country +"'><ul></ul></div>");
    	}
    	insertTweet(data, country);
    }
  });
});



function insertTweet(tweet, country) {
 if  ($("#" + country +" > li").length > 10) {
  console.log("deleting top tweet...");
  console.log($("#" + country +" li").last());
  $("#" + country +" li").last().remove();
  console.log("deleted top tweet");
}
//  $("#" + country).prepend('<li>' + tweet.text + '</li>');
 $(".tweet_country_holder").prepend('<li>' + tweet.text + '</li>');
}




