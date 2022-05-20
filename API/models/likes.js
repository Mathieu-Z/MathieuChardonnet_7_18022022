const { Model, DataTypes } = require("sequelize")

class Likes extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {type: DataTypes.INTEGER, allowNull: false},
      postId: {type: DataTypes.INTEGER, allowNull: false},
    },
      {
        sequelize
      })
  }
}

module.exports = Likes;