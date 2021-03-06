module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('country', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Country.hasMany(models.user)
      }
    }
  });
 
  return Country;
};