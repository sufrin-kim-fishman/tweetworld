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
  $('ul').prepend('<li>' + tweet.text + '</li>');
}

