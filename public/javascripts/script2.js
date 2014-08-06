$(function(){
  var server = io.connect('http://localhost:8080');
  server.on('tweets', function(data) {
    console.log('receiving tweets...')
    insertTweet(data);
  });
});

function insertTweet(tweet) {
  ('ul').prepend('<li>' + tweet.text + '</li>');
}