module.exports = function() {
  return {
      socket: require('socket.io')
    , http: require('http')
    , fs: require('fs')
    , twitter: require('twit')
    , flash: require('connect-flash')
    , express: require('express')
    , path: require('path')
    , passport: require('passport')
    , morgan: require('morgan')
    , cookieParser: require('cookie-parser')
    , bodyParser: require('body-parser')
    , session: require('express-session')
    , pg: require('pg')
    , port: process.env.PORT || 8080
    , db: require('../models')
    , bcrypt: require('bcrypt-nodejs')
  };
};

//In other files, call var env = require('path/to/this/file')();
//Then, call variables by env.variableName