$(function(){
  var server = io.connect('http://localhost:8080');
  var country;
  $("#submit").click(function(e) {
  	console.log("hi");
  	country = $("#country").val();
  	e.preventDefault();
  });
  server.on('tweets', function(data) {
    console.log(country);
    if(country === data.place.country) {
    	insertTweet(data);
    }
  });
});

function insertTweet(tweet) {

 if  ($("#twitterFeed > li").length > 10) {
  console.log("deleting top tweet...");
  console.log($("li").last());
  $("li").last().remove();
  console.log("deleted top tweet");
}
  $("#twitterFeed").prepend('<li>' + tweet.text + '</li>');
}




