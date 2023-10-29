const { Server } = require('socket.io');
const { Router, json } = require('express');
const ChatModel = require('../Database/GroupModel');
const UserModel = require('../Database/UserModel');
const authen = require('../middleware/authen');
const cH = Router();
const cookieParser = require('cookie-parser');

cH.use(cookieParser());
cH.use(json());
cH.post('/createGroup', authen, async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const doc = await ChatModel.create({
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

cH.post('/createGroup', authen, async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const doc = await ChatModel.create({
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
      socket.on('join-room', (name, callback) => {
        console.log(name, callback);
        ChatModel.findOne({ _id: name }, (err, data) => {
          if (err) {
            socket.emit('resp', {
              msg: 'Group not Found!',
              done: false,
            });
          } else {
            socket.join(token);
            socket.emit('resp', {
              msg: 'Successfully Connected',
              done: false,
            });
          }
        });
      });
      console.log('A User Added');
    });
  },
};

module.exports = { SocketInstance, cH };
