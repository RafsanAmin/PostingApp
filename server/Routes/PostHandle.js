const express = require('express');
const postModel = require('../Database/PostModel');
const UserModel = require('../Database/UserModel');
const pH = express.Router();
const busboy = require('connect-busboy');
const secret = process.env['TOKEN'];
const jwt = require('jsonwebtoken');
const deleteImages = require('../utils/deleteImage');
const authen = require('../middleware/authen');
const handlePostFormReq = require('../utils/handlePostFormReq');
pH.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);
pH.use(express.json());

pH.post('/addPost', authen, async (req, res) => {
  const size = parseInt(req.header('content-length'));
  if (size > 26214400) {
    res.status(403).json({ done: false, massage: 'Images Must Be less than 25MB at total.' });
  } else {
    const data = await handlePostFormReq(req);
    const UID = jwt.verify(req.cookies.jwt, secret);
    await UserModel.findOne({ _id: UID.id }, (err, udata) => {
      if (!err) {
        if (udata) {
          const uid = udata._id;
          const username = udata.username;
          const newPost = { ...data, likes: 0, uid, username };
          console.log(newPost);
          postModel.create(newPost, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json({ done: false, massage: 'A Server Error!' });
            }
            res.status(200).json({ done: true, massage: 'Done Bro!' });
          });
        } else {
          res.status(403).json({ done: false, massage: 'User Not Logged In' });
        }
      } else {
        res.json({ done: false });
      }
    });
  }
});
pH.get('/getPostsByDate', async (req, res) => {
  const { limit, before } = req.query;
  let find = await postModel
    .find()
    .sort({ _id: -1 })
    .skip(parseInt(before))
    .limit(parseInt(limit))
    .exec();
  if (find.length <= 0) {
    res.json({ hasMore: false, posts: [] });
  } else {
    res.json({ hasMore: true, posts: find });
  }
});
pH.get('/getPostsMine', async (req, res) => {
  const { id } = jwt.verify(req.cookies.jwt, secret);
  const { limit, before } = req.query;
  let find = await postModel
    .find({ uid: id })
    .sort({ _id: -1 })
    .skip(parseInt(before))
    .limit(parseInt(limit))
    .exec();
  if (find.length <= 0) {
    res.json({ hasMore: false, posts: [] });
  } else {
    res.json({ hasMore: true, posts: find });
  }
});
pH.get('/getPostsByUser', async (req, res) => {
  const { limit, before, uid } = req.query;
  let find = await postModel
    .find({ uid })
    .sort({ _id: -1 })
    .skip(parseInt(before))
    .limit(parseInt(limit))
    .exec();
  if (find.length <= 0) {
    res.json({ hasMore: false, posts: [] });
  } else {
    res.json({ hasMore: true, posts: find });
  }
});
pH.get('/getPost', async (req, res) => {
  const pid = req.query.pid;
  await postModel.findOne({ _id: pid }, (err, data) => {
    if (err) {
      res.status(404).json({ done: false, massage: 'Not Found', code: '404' });
    } else {
      res.json({ done: true, massage: 'Got it', post: data });
    }
  });
});
pH.post('/deletePost', authen, async (req, res) => {
  try {
    const { pid, photos } = { ...req.body.data };
    console.log(pid, photos);
    await deleteImages(photos);
    await postModel.findOneAndDelete({ _id: pid }, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ done: false, massage: 'A Server Side Error' });
      } else {
        console.log('sd;knvgasgojb');
        res.status(200).json({ done: true, massage: 'Post Deleted Successfully' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
pH.put('/updatePost', authen, async (req, res) => {
  try {
    const { id, kPhotos, photos, dPhotos, text, date } = await handlePostFormReq(req, 'update');
    await deleteImages(dPhotos);
    const updatedPost = { photos: photos.concat(kPhotos), text, date };
    await postModel.findOneAndUpdate({ _id: id }, updatedPost, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ done: false, massage: 'A Server Side Error' });
      } else {
        res.status(200).json({ done: true, massage: 'Post Successfully Edited!' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
module.exports = pH;
