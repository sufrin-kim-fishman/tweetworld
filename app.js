var env = require('./config/environment.js')()
  , app = env.express()
  , database = require('models/index.js')
  , User = database.sequelize.import(__dirname + "/models/user.js")
  , Country = database.sequelize.import(__dirname + "/models/country.js");
//go into models/index.js and change your database settings from ilanasufrin to yours



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

//app.use(session({secret: 'topsecretsecret',

app.use(env.session({secret: 'topsecretsecret',

                saveUninitialized: true,
                resave: true,
                cookie: {maxAge: 6000}}));
app.use(env.express.static(env.path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(env.cookieParser());
app.use(env.bodyParser());
app.use(env.passport.initialize());
app.use(env.passport.session());
app.use(env.flash());

env.db
  .sequelize
  .authenticate()
//  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      env.http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('env.port'))
      })
    }
  })

require('./config/passport')(env.passport);
require('./routes/routes.js')(app, env.passport);

var server = env.http.createServer(app);
var io = env.socket.listen(server);
var client;

var t = new env.twitter({
    consumer_key: "35AidvtI1yk6AKcNc6BDoMcVs",          
    consumer_secret: "ZhrapDlProEE6zZya4g1QdZjkfv9Q6HTBG7Q2Oy5TkGSXjihcD",       
    access_token: "2453054691-taj0rqSb33InlsEgkxEG2JSSxl546vWRt0QnkyH",      
    access_token_secret: "gUI8lk4GQVIAZ7zzUJ61s1XyGvx6D8oGO2ECGW8ZZsd1A"
});
var stream = t.stream('statuses/sample');

function openTweetConnection() {
  io.sockets.on('connection', function(clientSide) {
    client = clientSide;
    catchError();
    streamTweets();
    getUsername();
    getCountry();
  });
}

function catchError() {
  client.on('error', function() {
    console.log('error catch!');
  });
}

function streamTweets() {
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



function getUsername() {
  client.on('username', function(username) {
    findUser(username);
  });
}

function findUser(username) {
  User.find({where: {'username': username}})
  .success(function(user) {
    sendUsersCountries(user);
  });
}

function sendUsersCountries(user) {
  user.getCountries()
  .success(function(countries) {
    client.emit('username', countries);
  });
}

function getCountry() {
  client.on('country', function(countryObj) {
    var country = JSON.parse(countryObj);
    persistCountry(country.name, country.user);
  });
}

// function persistCountry(countryName, username) {
//   Country.findOrCreate({'name': countryName})
//   .success(function(country, created) {
//     if (created) {
//       User.find({where: {'username': username}})
//       .success(function(user) {
//         user.addCountry(country);
//       });
//     }
//   });
// }


function listenToServer() {
  server.listen(env.port);
}

(function() {
  openTweetConnection();
  listenToServer();
})()