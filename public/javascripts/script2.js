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
    		$(".container").append($("<div id="+ country +"><ul></ul></div>"));
    	}
    	$("<div id="+ country +">").append(insertTweet(data));
    }
  });
});

function insertTweet(tweet) {
	$("ul").prepend("<li>" + tweet.text + "</li>");
}

