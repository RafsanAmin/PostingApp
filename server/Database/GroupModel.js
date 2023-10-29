const { Schema, model, SchemaType } = require('mongoose');

const GroupSchema = new Schema({
  name: String,
  desc: String,
  pfp: String,
  created: String, // add requests
  members: [
    {
      uid: { type: Schema.Types.ObjectId, ref: 'User' },
      isAdmin: Boolean,
      isCreator: Boolean,
    },
  ],
  chats: [
    {
      uid: { type: Schema.Types.ObjectId, ref: 'User' },
      text: String,
      img: String,
      voice: String,
      time: { type: Schema.Types.Date },
    },
  ],
});

const GroupModel = model('Group', GroupSchema);

module.exports = GroupModel;
