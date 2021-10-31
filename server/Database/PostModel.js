const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  photos: [],
  likes: Number,
  date: String,
});

postSchema.statics.findPost = function (before, limit, cond) {
  return this.model('Post')
    .find(cond)
    .sort({ _id: -1 })
    .skip(parseInt(before))
    .limit(parseInt(limit))
    .populate('uid', 'username')
    .exec();
};
const postModel = new mongoose.model('Post', postSchema);

module.exports = postModel;
