const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: String,
  password: { type: String, min: 8 },
  groups: [{ type: Schema.Types.ObjectId, ref: 'ChatGroup' }],
  likedPosts: [],
  bio: String,
  bDay: String,
  work: String,
});

const userModel = model('User', userSchema);

module.exports = userModel;
