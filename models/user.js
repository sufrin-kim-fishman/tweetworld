var bycrypt = require('bcrypt-nodejs');

user.prototype.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = user;