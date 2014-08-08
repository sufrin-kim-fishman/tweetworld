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

//RUN THIS LOCALLY: create database "TweetWorld";
// var conString = "postgres://ilanasufrin:@localhost:5432/TweetWorld";

// //run this: 
// //npm install --save pg
// var Sequelize = require('sequelize')
//   , sequelize = new Sequelize('TweetWorld', 'ilanasufrin', "", {
//       dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
//       port:    5432, // or 3306 for any other SQL database
//     })

//   sequelize
//   .authenticate()
//   .complete(function(err) {
//     if (!!err) {
//       console.log('Unable to connect to the database:', err)
//     } else {
//       console.log('Connection has been established successfully.')
//     }
//   })

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

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
    consumer_key: "35AidvtI1yk6AKcNc6BDoMcVs",          
    consumer_secret: "ZhrapDlProEE6zZya4g1QdZjkfv9Q6HTBG7Q2Oy5TkGSXjihcD",       
    access_token: "2453054691-taj0rqSb33InlsEgkxEG2JSSxl546vWRt0QnkyH",      
    access_token_secret: "gUI8lk4GQVIAZ7zzUJ61s1XyGvx6D8oGO2ECGW8ZZsd1A"
});
var stream = t.stream('statuses/sample');
app.set('port', process.env.PORT || 8080);

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
   //   doDatabaseThings(tweet.place.country);
      client.emit('tweets', JSON.stringify(tweet));
    }
  });
}

function listenToServer() {
  server.listen(8080);
}

(function() {
  openTweetConnection();
  listenToServer();
})()
