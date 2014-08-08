var socket = require('socket.io')
  , http = require('http')
  , twitter = require('twit')
  , express = require('express')
  , path = require('path')
  , app = express();

var pg = require('pg');
//configure this using your local postgres settings
//RUN THIS LOCALLY: create database "TweetWorld";
var conString = "postgres://ilanasufrin:@localhost:5432/TweetWorld";




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
    if (tweet.place !== null) {
      console.log(tweet);
      doDatabaseThings(tweet.place.country);
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




  //RUN THIS LOCALLY: create database "TweetWorld";
function doDatabaseThings(tweet) {
 createTable();
 findRowName(tweet);
}

function createTable() {
   pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('CREATE TABLE IF NOT EXISTS countryNames ("id" SERIAL PRIMARY KEY, "name" varchar(200));', function(err, result) {
      console.log("created table or using one that exists. good.");
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('problem creating table', err);
      }
    });
  });
}

function insertRecord(tweet) {
   pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query("INSERT INTO countryNames (name) VALUES ('" + tweet + "');", function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('problem inserting country name', err);
      }
      console.log(result);
    //output: 1
    });
  });
}

function findRowName(name) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('problems connecting', err);
    }


    client.query("SELECT * from countryNames where name = '" + name + "';", function(err, result) {
      //call `done()` to release the client back to the pool
      console.log("THIS IS WHAT GETS RETURNED: " + result);
      if(result == false) {
        insertRecord(tweet);
      }
      done();

      if(err) {
        return console.error('problem finding country name', err);
      }
      console.log(result);

      //true or false here
      
   });
  });
}



