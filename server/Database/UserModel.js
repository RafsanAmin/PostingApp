const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, min: 8 },
  likedPosts: [],
  profilePic: String,
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
