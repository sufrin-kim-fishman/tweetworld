migration.createTable(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
   
  },
  {
    engine: 'MYISAM', // default: 'InnoDB'
    charset: 'latin1' // default: null
  }
)