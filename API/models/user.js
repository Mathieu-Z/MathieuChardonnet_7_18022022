const { Model, TINYINT, DataTypes} = require("sequelize")

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: { type: DataTypes.STRING(100), allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false, unique: true },
      isAdmin: { type: TINYINT(0), default: 0 },
    },
      {
        sequelize
      })
  }
}

module.exports = User;
