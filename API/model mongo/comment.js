const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Comment', commentSchema);