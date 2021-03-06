const Sequelize = require('sequelize');
const configDB = require('../config/config');

const User = require('../models/user');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');

const connectionDB = new Sequelize(configDB);
console.log('connecté à la base de donnée!');

User.init(connectionDB);
Post.init(connectionDB);
Comment.init(connectionDB);
Like.init(connectionDB);

Post.belongsTo(User, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'}); 
Comment.belongsTo(Post, {foreignKey: 'postId'});

module.exports = connectionDB;