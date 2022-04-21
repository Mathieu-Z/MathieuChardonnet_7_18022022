const Sequelize = require('sequelize');
const configDB = require('../config/db');

const User = require('../models/model mongo/user');
const Post = require('../models/model mongo/post');
const Comment = require('../models/model mongo/comment');

const connectionDB = new Sequelize(configDB);
console.log('connecté à la base de donnée!')

User.init(connectionDB);
Post.init(connectionDB);
Comment.init(connectionDB);
Likes.init(connectionDB);

Post.belongsTo(User, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'}); 
Comment.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = connectionDB;