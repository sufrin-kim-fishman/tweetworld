var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var sequelize = new Sequelize('TweetWorld', 'justinkim', "", {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 3306 for any other SQL database
  });
var user = sequelize.import(__dirname + "/../models/user.js");
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      user.find({where: { username: 'username'} })
      .complete(function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken'))
        } else {
          debugger;
          var newUser = user.build( {
              username: username,
              password: generateHash(password)
            });
          //let's get the syntax right because it's wrong
          newUser.save();
          newUser.complete(function(err) {
            if(err) {
              throw err;
              console.log('The instance has not been saved:', err)
            }
            console.log('We have a persisted instance now')
          });
        }
      });
    })
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
      user.find({'username': username}, function(err, user) {
        if (err) return done(err);
        if (!user || !user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'The username or password was wrong.'));
        return done(null, user);
      });
  }))

};

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}