const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  uid: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  text: String,
  photos: [],
  like: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  date: String
});

const postModel = new mongoose.model("Posts", postSchema);

module.exports = postModel;