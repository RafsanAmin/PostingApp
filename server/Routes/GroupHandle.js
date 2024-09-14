const express = require('express');
const authen = require('../middleware/authen');
const GroupModel = require('../Database/GroupModel');
const UserModel = require('../Database/UserModel');
const gh = express.Router();
const secret = process.env['TOKEN'];
const jwt = require('jsonwebtoken');
const IdIsValid = require('mongoose').Types.ObjectId.isValid;
const cloudinary = require('cloudinary').v2;

const handlePostFormReq = require('../utils/handleFormReq');
gh.use(express.json());
const busboy = require('connect-busboy');
const gauthen = require('../middleware/groupAuthen');

const gMiddlewares = [authen, gauthen];

gh.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);
gh.post('/createGroup', authen, async (req, res) => {
  const userID = jwt.verify(req.cookies.jwt, secret);
  const { name, desc, pfp } = req.body;

  const exst = await GroupModel.exists({ name });
  if (!exst) {
    GroupModel.create(
      {
        name,
        desc,
        pfp,
        created: new Date().toUTCString(),

        members: [
          {
            uid: userID.id,
            isAdmin: true,
            isCreator: true,
          },
        ],
        chats: [],
      },
      async (err, rdata) => {
        try {
          if (err) {
            throw new Error('Unexpected Error!');
          }
          await UserModel.updateOne(
            {
              _id: userID.id,
            },
            {
              $push: {
                groups: rdata._id,
              },
            }
          );
          res.json({ done: true, id: rdata._id });
        } catch (err) {
          console.log(err);
          res.status(500).json({ done: false, msg: err });
        }
      }
    );
  } else {
    res.json({ done: false, msg: 'Group Already Exists' });
  }
});

gh.post('/joinGroup', authen, async (req, res) => {
  try {
    const userID = jwt.verify(req.cookies.jwt, secret).id;
    const { grpId } = req.body;
    console.log(req.body);
    const isValid = await IdIsValid(grpId);

    const exst = isValid ? await GroupModel.exists({ _id: grpId }) : false;

    const usr = await UserModel.findOne({ _id: userID });

    const existsGroup = usr.groups.includes(grpId);
    if (existsGroup) {
      res.json({ done: true, msg: 'Already joined!' });
    } else if (exst) {
      await GroupModel.updateOne(
        { _id: grpId },
        {
          $addToSet: {
            members: {
              uid: userID,
              isAdmin: false,
              isCreator: false,
            },
          },
        }
      );

      await UserModel.updateOne({ _id: userID }, { $addToSet: { groups: grpId } });
      res.json({ done: true });
    } else {
      res.json({ done: false, msg: "Group Doesn't Exists", notfound: true });
    }
  } catch (err) {
    console.log(err);
    res.json({ done: false, msg: 'Unexpected Error!' });
  }
});

gh.post('/exitGroup', gMiddlewares, async (req, res) => {
  try {
    const userID = jwt.verify(req.cookies.jwt, secret).id;
    const { grpId } = req.body;
    console.log(req.body);
    const isValid = await IdIsValid(grpId);

    const exst = isValid ? await GroupModel.exists({ _id: grpId }) : false;
    if (exst) {
      await GroupModel.updateOne(
        { _id: grpId },
        {
          $pull: {
            members: {
              uid: userID,
            },
          },
        }
      );
      await UserModel.updateOne({ _id: userID }, { $pull: { groups: grpId } });
      res.json({ done: true });
    } else {
      res.json({ done: false, msg: "Group Doesn't Exists" });
    }
  } catch (err) {
    console.log(err);
    res.json({ done: false, msg: 'Unexpected Error!' });
  }
});

gh.get('/info', gMiddlewares, async (req, res) => {
  try {
    const userID = jwt.verify(req.cookies.jwt, secret).id;
    const { grpId } = req.query;
    console.log(req.body);
    const isValid = await IdIsValid(grpId);

    const exst = isValid ? await GroupModel.findOne({ _id: grpId }) : false;
    if (exst) {
      GroupModel.findOne({ _id: grpId })
        .populate('members.uid', ['username'])
        .then((resp) => {
          res.json({ done: true, data: resp });
        })
        .catch((err) => {
          throw new Error('Unexpected Error!');
        });
    } else {
      res.json({ done: false, msg: "Group Doesn't Exists" });
    }
  } catch (err) {
    console.log(err);
    res.json({ done: false, msg: 'Unexpected Error!' });
  }
});

gh.post('/kickMember', gMiddlewares, async (req, res) => {
  try {
    const self = jwt.verify(req.cookies.jwt, secret).id;
    const { grpId, userID } = req.body;
    console.log(req.body);
    const isValid = await IdIsValid(grpId);

    const exst = isValid ? await GroupModel.exists({ _id: grpId }) : false;
    if (exst) {
      GroupModel.findById(grpId).then((data) => {});
      await GroupModel.updateOne(
        { _id: grpId },
        {
          $pull: {
            members: {
              uid: userID,
            },
          },
        }
      );
      await UserModel.updateOne({ _id: userID }, { $pull: { groups: grpId } });
      res.json({ done: true });
    } else {
      res.json({ done: false, msg: "Group Doesn't Exists" });
    }
  } catch (err) {
    console.log(err);
    res.json({ done: false, msg: 'Unexpected Error!' });
  }
});
module.exports = gh;
