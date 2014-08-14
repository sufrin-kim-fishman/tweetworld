var env = require('./config/environment.js')()
  , app = env.express()
  , database = require('./models/index.js')
  , User = database.sequelize.import(__dirname + "/models/user.js")
  , Country = database.sequelize.import(__dirname + "/models/country.js")
  , keys = require('./config/keys.js')();

app.use(env.session({secret: keys.session_secret,
                saveUninitialized: true,
                resave: true}));
app.use(env.express.static(env.path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.use("../stylesheets", env.express.static(__dirname + "/stylesheets"));
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
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      env.http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('env.port'))
      })
    }
  });

require('./config/passport')(env.passport);
require('./routes/routes.js')(app, env.passport);

var server = env.http.createServer(app);
var io = env.socket.listen(server);

function openTweetConnection() {
  io.sockets.on('connection', function(client) {
    getData(client);
  });
}

function getData(client) {
  getUsername(client);
  getCountryToPersist(client);
  getCountryToDestroy(client);
}

function setStreaming() {
  var t = new env.twitter({
      consumer_key: keys.consumer_key,          
      consumer_secret: keys.consumer_secret,       
      access_token: keys.access_token,      
      access_token_secret: keys.access_token_secret
  });
  return t.stream('statuses/sample');
}

function streamTweets() {
  setStreaming().on('tweet', function(tweet) {
    if (tweet.place !== null) {
      io.sockets.emit('tweets', JSON.stringify(tweet));
    }
  });
}

function getUsername(client) {
  client.on('username', function(username) {
    findUser(username)
    .success(function(user) {
      sendUsersCountries(user, client);
    });
  });
}

function findUser(username) {
  return User.find({where: {'username': username}});
}

function sendUsersCountries(user, client) {
  user.getCountries()
  .success(function(countries) {
    client.emit('username', countries);
  });
}

function getCountryToPersist(client) {
  client.on('persistCountry', function(countryObj) {
    var country = JSON.parse(countryObj);
    persistCountry(country.name, country.user);
  });
}

function persistCountry(countryName, username) {
  Country.findOrCreate({'name': countryName})
  .success(function(country, created) {
    findUser(username)
    .success(function(user) {
      user.addCountry(country);
    });
  });
}

function getCountryToDestroy(client) {
  client.on('deleteCountry', function(countryObj) {
    var country = JSON.parse(countryObj);
    deleteCountry(country.name, country.user);
  });
}

function deleteCountry(countryName, username) {
  Country.find({where: {'name': countryName}})
  .success(function(country) {
    findUser(username)
    .success(function(user) {
      user.removeCountry(country);
    });
  });
}

function listenToServer() {
  server.listen(env.port);
}

(function() {
  streamTweets();
  openTweetConnection();
  listenToServer();
})();