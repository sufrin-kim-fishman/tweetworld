var socket = require('socket.io')
  , http = require('http')
  , twitter = require('twit')
  , express = require('express')
  , path = require('path')
  , app = express();

var pg = require('pg');
var conString = "postgres://ilanasufrin:@localhost:5432/test";

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = socket.listen(server);

var t = new twitter({
    consumer_key: "N3wxjYdnjaq8OjmlyeAnQ0uiX",          
    consumer_secret: "C2Y71NQyrFBCbGHhkSFPqHE9penIacIvB1DUgrk7jAkUW8qpmM",       
    access_token: "316015598-IciiwWwpx7tf0HaslKVu2SL5otrONTzZOJwG0TnR",      
    access_token_secret: "9Ju0fDyFZ2ksMf9YTwDJlO7csqyecrBs3pwtBclQqyjOg"
});
var stream = t.stream('statuses/sample');
app.set('port', process.env.PORT || 8080);

function setPage() {
  app.get('/', function(request, response) {
    response.sendfile('views/index.html');
  });
}

function openTweetConnection() {
  io.sockets.on('connection', function(client) {
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
  stream.on('tweet', function(tweet) {
    if (tweet.geo !== null) {
      console.log(tweet);
      client.emit('tweets', JSON.stringify(tweet));
    }
  });
}


// function sendAlert(client) {
//   client.emit('backupAlert', 'BACKUP ERROR!')
// }


function listenToServer() {
  server.listen(8080);
}

(function() {
  setPage();
  openTweetConnection();
  listenToServer();
})()


pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('INSERT INTO tristans_test (code) VALUES ($1)', ['THIS IS FROM NODE!!!'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    //output: 1
  });
});



