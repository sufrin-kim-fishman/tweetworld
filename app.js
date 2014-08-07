var socket = require('socket.io')
  , http = require('http')
  , twitter = require('twit')
  , express = require('express')
  , path = require('path')
  , app = express();

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = socket.listen(server);

var t = new twitter({
    consumer_key: "N3wxjYdnjaq8OjmlyeAnQ0uiX",          
    consumer_secret: "C2Y71NQyrFBCbGHhkSFPqHE9penIacIvB1DUgrk7jAkUW8qpmM",       
    access_token: "316015598-IciiwWwpx7tf0HaslKVu2SL5otrONTzZOJwG0TnR",      
    access_token_secret: "9Ju0fDyFZ2ksMf9YTwDJlO7csqyecrBs3pwtBclQqyjOg"
});

app.set('port', process.env.PORT || 8080);

function setPage() {
  app.all('/', function(request, response) {
    response.sendfile('views/index.html');
  });
}

function openTweetConnection() {
  io.sockets.on('connection', function(client) {
    console.log('Connection is open...');
    catchError(client);
    streamTweets(client);
  });
}

function catchError(client) {
  client.on('error', function() {
    console.log('error catch!');
  });
}

function streamTweets(client) {
  var stream = t.stream('statuses/sample');
  stream.on('tweet', function(tweet) {
    var buffer_good = client.write(tweet);
    if(!buffer_good) {sendAlert(client);}
    if (tweet.geo !== null) {
      console.log(tweet);
      client.emit('tweets', JSON.stringify(tweet));
    }
  });
}

function sendAlert(client) {
  client.emit('backupAlert', 'BACKUP ERROR!');
}

function listenToServer() {
  server.listen(8080);
}

(function() {
  setPage();
  openTweetConnection();
  listenToServer();
})()