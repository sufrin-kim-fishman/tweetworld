var socket = require('socket.io')
  , http = require('http')
  , fs = require('fs')
  , twitter = require('twit')
  , flash = require('connect-flash')
  , express = require('express')
  , path = require('path')
  , passport = require('passport')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , pg = require('pg')
  , app = express();

//configure this using your local postgres settings
var conString = "postgres://justinkim:@localhost:5432/TweetWorld";

app.use(session({secret: 'topsecretsecret',
                saveUninitialized: true,
                resave: true,
                cookie: {maxAge: 6000}}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./routes/routes.js')(app, passport);

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
<<<<<<< HEAD
=======

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
>>>>>>> 561418b63d77203e23e6bf1c2db1e5dfdc70fef6
