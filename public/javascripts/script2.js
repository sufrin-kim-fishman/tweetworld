$(function(){
  var server = io.connect('http://localhost:8080');
  server.on('tweets', function(data) {
    console.log('receiving tweets...')
    insertTweet(data);
  });
});

function insertTweet(tweet) {
  // var tweetsArray = []
  // tweetsArray += tweet.text;
 if  ($("#twitterFeed > li").length > 10) {
  console.log("deleting top tweet");
  console.log($("li").last());
 // $("#orderedList").remove($("li").last());
 $("li").last().remove();
  console.log("deleted top tweet");
}
  $("#twitterFeed").prepend('<li>' + tweet.text + '</li>');
}