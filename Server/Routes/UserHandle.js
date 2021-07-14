const UserModelDB = require('../Database/UserModel');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const busboy = require('connect-busboy');
const uh = express.Router();
require('dotenv').config({ path: `${__dirname}../../.env` });

const secret = process.env.TOKEN;
const pass = process.env.PASSWORD;

const mailerTransport = require('@sendgrid/mail');
const uploadProfilePic = require('../utils/profilePicUpload');
const authen = require('../middleware/authen');
const randomNumber = require('../../library/randomNumber');

mailerTransport.setApiKey(pass);
uh.use(cookieParser());
uh.use(express.json());
uh.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));
uh.get('/login', async (req, res, next) => {
  const { username, password, remMe } = req.query;
  await UserModelDB.findOne({ username }, async (err, data) => {
    if (!data) {
      res.status(401).json({ massage: "User Doesn't Exists", done: false, exists: false });
    } else {
      const Foundpassword = data.password;
      const id = data._id;
      const passm = await bcrypt.compare(password, Foundpassword).catch((err) => console.log(err));
      if (passm) {
        const scrt = jwt.sign({ id }, secret);
        if (remMe === 'true') {
          res.cookie('jwt', scrt, {
            maxAge: 900000000,
            httpOnly: true,
          });
        } else {
          res.cookie('jwt', scrt, {
            httpOnly: true,
          });
        }
        res.status(200).json({ massage: 'Done', done: true, exists: true });
        // sameSite: "lax", include at deploy
      } else {
        res.status(401).json({
          massage: 'Password is not correct!',
          done: false,
          exists: true,
        });
      }
    }
  });
});
uh.get('/logout', async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({done: true})
});
uh.post('/signup', async (req, res, next) => {
  const { username, password, email, likedPosts, profilePic } = req.body;
  const alExist = await UserModelDB.exists({ username });
  if (!alExist) {
    const sPass = await bcrypt.hash(password, 10);
    const newUserData = {
      username,
      password: sPass,
      email,
      likedPosts,
      profilePic,
    };
    await UserModelDB.create(newUserData, (err, data) => {
      if (err) {
        res.status(500).json({
          massage: 'User Cant Be Added For Server Side Error',
          done: false,
          exists: false,
        });
      } else {
        const userID = data._id;
        res.status(200).json({
          massage: 'User Added',
          done: true,
          exists: false,
          id: userID,
        });
      }
    });
  } else { 
    res.json({ massage: 'User Already Exists', success: false, exists: true });
  }
});
uh.post('/addProfilePic', async (req, res, next) => {
  uploadProfilePic(req, res);
});
uh.post('/verify', async (req, res, next) => {
  const { user, email } = req.body;
  const number = randomNumber(7);
  const alExist = await UserModelDB.exists({ username: user });
  console.log(user); 
  if (!alExist) {
    const sendMail = {
      from: 'rafpost001@gmail.com',
      to: email,
      subject: 'Your Verfication Code in RafPost',
      html: `<p>Your Verfication code is <br> <b style="font-size: 1.5rem">${number}</b>  <br> in RafPost Account. Give it to you Verification Input and Create your Account</p>`,
    };
    try {
      await mailerTransport.send(sendMail);
      res.json({
        massage: 'Verification Mail Send',
        success: true,
        exists: false,
        verification: number,
      });
    } catch (err) {
      res.json({
        massage: "Verification Mail Can't be Sent",
        success: false,
        exists: false,
      });
    }
  } else {
    res.json({ massage: 'User Already Exists', success: false, exists: true });
  }
});
uh.get('/getProfilePicLink', async(req, res, next) => {
  let jwtToken = req.cookies.jwt;
  const verified = jwt.verify(jwtToken, secret);
  res.json({url: `https://res.cloudinary.com/dyjrfa6c2/image/upload/profilepic/${verified.id}`})
})
uh.get('/authen', authen);

module.exports = uh;
