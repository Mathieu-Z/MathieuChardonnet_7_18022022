const Sequelize = require('sequelize');
const configDB = require('../config/db');

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const connectionDB = new Sequelize(configDB);
console.log('connecté à la base de donnée!')

User.init(connectionDB);
Post.init(connectionDB);
Comment.init(connectionDB);
Likes.init(connectionDB);

Post.belongsTo(User, {foreignKey: 'users_id'});
Comment.belongsTo(User, {foreignKey: 'users_id'}); 
Comment.belongsTo(Post, {foreignKey: 'posts_id'});

module.exports = connectionDB;