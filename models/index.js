var fs        = require('fs')
  , path      = require('path')
  , lodash    = require('lodash')
  , db        = {}

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;
 
  if (process.env.HEROKU_POSTGRESQL_BLUE_URL) {
    var match = process.env.HEROKU_POSTGRESQL_BLUE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
 
    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3]
    });

  } else {
    sequelize = new Sequelize('TweetWorld', 'justinkim', null, {
      dialect: "postgres",
      port:    5432
    });
  }
 
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user') 
  };

}
 
module.exports = global.db;