var localStrategy = require('passport-local').Strategy;
var user = require('../models/user');

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
      user.findOne({'local.username': username}, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken'))
        } else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if(err) throw err;
            return done(null, newUser);
          });
        }
      });
    })
  }));

};