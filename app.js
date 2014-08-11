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
  , app = express()
  , port = process.env.PORT || 8080
  , db   = require('./models');


var Sequelize = require('sequelize');
var sequelize = new Sequelize('TweetWorld', 'ilanasufrin', "", {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 3306 for any other SQL database
  });
var Country = sequelize.import(__dirname + "/models/country.js");


//RUN THIS LOCALLY: create database "TweetWorld";
//var conString = "postgres://ilanasufrin:@localhost:5432/TweetWorld";

//run this: 
//npm install --save pg
//npm install --save sequelize-cli

//now go into models/index.js and change your database settings from ilanasufrin to yours

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
//app.set('port', process.env.PORT || 8080);
app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 db
  .sequelize
  .authenticate()
//  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })

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
      addCountryToDatabase(tweet);
      client.emit('tweets', JSON.stringify(tweet));
    }
  });
}


function addCountryToDatabase(tweet, done) {
 // function(countryname, done) {
  var countryname = tweet.place.country;
      process.nextTick(function() {
        Country.find({where: { 'name': countryname} })
        .complete(function(err, country) {
      //  if (err) return done(err);
        if (country) {
       //   return done(null, false, console.log('That country is already in the database'))
        } else {
          var newCountry = Country.build( {
              name: countryname
            });
          //let's get the syntax right because it's wrong

          newCountry.save()
          .complete(function(err) {
            if(err) {
              throw err;
              console.log('The country instance has not been saved:', err);
            }
            console.log('We have a persisted country instance now');
         //   return done(null, newCountry);
          });
       // }
      }//);
    });
  });
}



function listenToServer() {
  server.listen(port);
}

(function() {
  openTweetConnection();
  listenToServer();
})()