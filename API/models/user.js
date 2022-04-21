'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
      pseudo: {type: DataTypes.STRING(100), allowNull: false},
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      password: {type: DataTypes.STRING, allowNull: false, unique: true},
      isAdmin: {type: TINYINT(0), allowNull: true, default: 0 },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};