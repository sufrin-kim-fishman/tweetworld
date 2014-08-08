module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Country', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Country.hasMany(models.User)
      }
    }
  })
 
  return Task
}