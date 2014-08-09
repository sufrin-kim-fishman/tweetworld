var bycrypt = require('bcrypt-nodejs');

//got this from the docs
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Country)
      }
    }
  });
  User.validPassword = function(password) { return bcrypt.compareSync(password, this.password);};
  User.generateHash = function(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);};
  return User;
};