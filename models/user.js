var bycrypt = require('bcrypt-nodejs');

function User() {}

User.prototype.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;

//got this from the docs
// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     username: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         User.hasMany(models.Country)
//       }
//     }
//   })
 
//   return User
// }