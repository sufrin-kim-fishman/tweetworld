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
    consumer_key: "35AidvtI1yk6AKcNc6BDoMcVs",          
    consumer_secret: "ZhrapDlProEE6zZya4g1QdZjkfv9Q6HTBG7Q2Oy5TkGSXjihcD",       
    access_token: "2453054691-taj0rqSb33InlsEgkxEG2JSSxl546vWRt0QnkyH",      
    access_token_secret: "gUI8lk4GQVIAZ7zzUJ61s1XyGvx6D8oGO2ECGW8ZZsd1A"
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

function listenToServer() {
  server.listen(8080);
}

(function() {
  setPage();
  openTweetConnection();
  listenToServer();
})()