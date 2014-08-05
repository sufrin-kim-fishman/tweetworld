$(function(){
  var server = io.connect('http://localhost:8080');
  server.on('tweets', function(data) {
    insertTweet(data.text);
  });
});

function insertTweet(tweet) {
  ('ul').prepend('<li>' + tweet.text + '</li>');
}