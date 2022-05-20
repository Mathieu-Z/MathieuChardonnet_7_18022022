const { Model, DataTypes } = require("sequelize")

class Comments extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {type: DataTypes.INTEGER, allowNull: false},
      content: {type: DataTypes.STRING, allowNull: false},
      date: { type: DataTypes.DATE },
      postId: {type: DataTypes.INTEGER, allowNull: false},
    },
      {
        sequelize
      })
  }
}

module.exports = Comments;