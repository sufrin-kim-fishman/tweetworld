var socket = require('socket.io')
  , http = require('http')
  , twitter = require('ntwitter')
  , express = require('express')
  , app = express();

var server = http.createServer(app);
var io = socket.listen(server);

var t = new twitter({
    consumer_key: "k8Owe3iZwGMUgD1Dn64lTKN32",          
    consumer_secret: "6HhPFD747pq9iXbHNoqCMclqGa1Ibd4IhvWC7h6bBY8h7hp762",       
    access_token_key: "942399211-7J7mUWuEC1shJHXRnFvKyEFUJVhRh9aFfQd43BzB",      
    access_token_secret: "EPXwymTXCdTWkMzcxlnVYsI0Gexxo4mB1505idQ40jb9k"
});

app.set('port', process.env.PORT || 8080);

// app.get('/', function(request, response) {
  console.log('This half works...');
  io.sockets.on('connection', function(client) {
    console.log('Server is connected...');
    // t.stream('statuses/sample',function(stream) {
    //   stream.on('data', function(tweet) {
    //     if (tweet.geo !== null) {
    //        io.sockets.emit('tweets', {text: tweet});
    //     }
    //   });
    // });
  });
// });

server.listen(8080);