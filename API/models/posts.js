const { Model, DataTypes } = require("sequelize")

class Posts extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      date: { type: DataTypes.DATE },
    },
      {
        sequelize
      })
  }
}

module.exports = Posts;