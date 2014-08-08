var bycrypt = require('bcrypt-nodejs');

//got this from the docs
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Country)
      }
    }
  });
 


  function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};