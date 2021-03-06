var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.country)
      }
    },
    instanceMethods: {  
      validPassword: function(password) { return bcrypt.compareSync(password, this.password);},
    }
  });
  return User;
};