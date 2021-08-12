const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  photos: [],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: String,
});

const postModel = new mongoose.model("Post", postSchema);

module.exports = postModel;
