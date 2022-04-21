const { Model, DataTypes, DATE } = require("sequelize");

class Comment extends Model {
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
      date: {type: DataTypes.DATE},
      likes: {type: DataTypes.NUMBER, defaultValue: 0 },
      dislikes: {type: DataTypes.NUMBER, defaultValue: 0 },
      usersLiked: {type: DataTypes.ARRAY },
      usersDisliked: {type: DataTypes.ARRAY },
      postId: {type: DataTypes.INTEGER, allowNull: false},
    },
      {
        sequelize
      })
  }
}

module.exports = Comment;