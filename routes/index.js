var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



 
exports.index = function(req, res){
  db.User.findAll({
    include: [ db.Country ]
  }).success(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    })
  })
}