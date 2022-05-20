const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like')
const path = require('path');

require('dotenv').config()

//connexion avec la base de donnés
require('./database');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  //res.setHeader('Access-Control-Allow-Headers',"*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;