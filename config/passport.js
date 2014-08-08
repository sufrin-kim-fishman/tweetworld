var LocalStrategy = require('passport-local').Strategy;
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
      user.find({'username': username}, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken'))
        } else {
          var newUser = User.build( {
              newUser.username: username,
              newUser.password: newUser.generateHash(password)
            });
        
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