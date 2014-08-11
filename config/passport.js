var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var sequelize = new Sequelize('TweetWorld', 'Ado', "", {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
    port:    5432, // or 3306 for any other SQL database
  });
var User = sequelize.import(__dirname + "/../models/user.js");
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find({where: {'id': id}})
    .complete(function(err, user) {
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
        User.find({where: { 'username': username} })
        .complete(function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken'))
        } else {
          var newUser = User.build( {
              username: username,
              password: generateHash(password)
            });

          newUser.save()
          .complete(function(err) {
            if(err) {
              throw err;
              console.log('The instance has not been saved:', err);
            }
            console.log('We have a persisted instance now');
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
      User.find({where: {'username': username}})
      .complete(function(err, user) {
        if (err) return done(err);
        if (!user || !user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'The username or password was wrong.'));
        return done(null, user);
      });
    }))
};

function generateHash(password) {
  return env.bcrypt.hashSync(password, env.bcrypt.genSaltSync(8), null);
}