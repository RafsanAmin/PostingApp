const { Server } = require('socket.io');
const { Router, json } = require('express');
const ChatModel = require('../Database/GroupModel');
const UserModel = require('../Database/UserModel');
const authen = require('../middleware/authen');
const cH = Router();
const cookieParser = require('cookie-parser');
const GroupModel = require('../Database/GroupModel');

cH.use(cookieParser());
cH.use(json());

cH.get('/getChats', authen, async (req, res) => {
  const { _id } = req.user;
  const { name } = req.query;
  const doc = await GroupModel.create({
    name,
    members: [
      {
        uid: _id,
        power: 'Creator',
      },
    ],
  });
  console.log(doc);
  await UserModel.findOneAndUpdate({ _id }, { $push: { groups: doc._id } });
  res.json({
    done: true,
  });
});

const SocketInstance = {
  makeSocketServer: (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('Socket is ON!');
      socket.on('join-room', (name, callback) => {
        console.log(name, callback);
        GroupModel.findOne({ _id: name }, (err, data) => {
          if (err) {
            socket.emit('resp', {
              msg: 'Group not Found!',
              done: false,
            });
          } else {
            socket.join(name);
            socket.emit('resp', {
              msg: 'Successfully Connected',
              done: true,
            });
          }
        });
      });

      socket.on('chat', ({ data, roomId }, callback) => {
        GroupModel.updateOne({ _id: roomId }, { $push: { chats: data } }).then((d, err) => {
          console.log(d, err);
          socket.to(roomId).emit('chat_b', data);
        });
      });
      console.log('A User Added');
    });
  },
};

module.exports = { SocketInstance, cH };
