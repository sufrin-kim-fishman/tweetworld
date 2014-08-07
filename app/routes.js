module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });

  // app.get('/profile', isLoggedIn, function(req, res) {
  //   res.render('profile.ejs')
  // });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}