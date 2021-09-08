const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  text: String,
  photos: [],
  likes: Number,
  date: String,
});

const postModel = new mongoose.model('Post', postSchema);

module.exports = postModel;
