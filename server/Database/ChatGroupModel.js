const { Schema, model, SchemaType } = require('mongoose');

const ChatGroupSchema = new Schema({
  name: String,
  desc: String,
  pfp: String,
  status: { type: String, enum: ['ease', 'locked'] },
  requests: [
    {
      uid: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  members: [
    {
      uid: { type: Schema.Types.ObjectId, ref: 'User' },
      power: { type: String, enum: ['Member', 'Admin', 'Creator'] },
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

const ChatGroupModel = model('ChatGroup', ChatGroupSchema);

module.exports = ChatGroupModel;
