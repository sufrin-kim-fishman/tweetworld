// var fs        = require('fs')
//   , path      = require('path')
//   , Sequelize = require('sequelize')
//   , lodash    = require('lodash')
//   , sequelize = new Sequelize('TweetWorld', 'ilanasufrin', "", {
//       dialect: "postgres",
//       port:    5432, 
//     })
//   , db        = {}
 
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== 'index.js')
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file))
//     db[model.name] = model
//   })
 
// Object.keys(db).forEach(function(modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db)
//   }
// })
 
// module.exports = lodash.extend({
//   sequelize: sequelize,
//   Sequelize: Sequelize
// }, db)

//this is old code above here

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;
 
  if (process.env.HEROKU_POSTGRESQL_BLUE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BLUE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
 
    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    });
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('TweetWorld', 'ilanasufrin', null, {
      dialect: "postgres",
      port:    5432
    });
  }
 
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user')
 
    // add your other models here
  };
 
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}
 
module.exports = global.db;

