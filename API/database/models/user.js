const { Model, DataTypes, TINYINT } = require("sequelize")

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {type: DataTypes.STRING(100), allowNull: false},
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      password: {type: DataTypes.STRING, allowNull: false, unique: true},
      isAdmin: {type: TINYINT(0), allowNull: true, default: 0 },
    },
      {
        sequelize
      })
  }
}

module.exports = User;