const UserModelDB = require('../Database/UserModel');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const busboy = require('connect-busboy');
const uh = express.Router();
const checkExistsAndResponse = require('../utils/checkExistAndRes');
const secret = process.env.TOKEN;
const pass = process.env.PASSWORD;
const IdIsValid = require('mongoose').Types.ObjectId.isValid;
const mailerTransport = require('@sendgrid/mail');
const uploadProfilePic = require('../utils/profilePicUpload');
const authen = require('../middleware/authen');
const { getRandomNumber } = require('../../library/random');
const { wordIncludes } = require('../../library/filter');
const getIdFromJwt = require('../utils/getIdJWT');
const handleFormRequest = require('../utils/handleFormReq');
const deleteImages = require('../utils/deleteImage');
const verifyModel = require('../Database/VerifyModel.js');

mailerTransport.setApiKey(pass);
uh.use(cookieParser());
uh.use(express.json());
uh.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);
uh.get('/login', async (req, res, next) => {
  try {
    const { username, password, remMe } = req.query;
    await UserModelDB.findOne({ username }, async (err, data) => {
      if (!data) {
        res.status(401).json({ massage: "User Doesn't Exists", done: false, exists: false });
      } else {
        const Foundpassword = data.password;
        const id = data._id;
        const passm = await bcrypt
          .compare(password, Foundpassword)
          .catch((err) => console.log(err));
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.get('/logout', authen, async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.json({ done: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, bio } = req.body;
    const alExist = await UserModelDB.exists({ username });
    if (!alExist) {
      const sPass = await bcrypt.hash(password, 10);
      const newUserData = {
        username,
        password: sPass,
        email,
        bio: bio || '',
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.post('/addProfilePic', async (req, res, next) => {
  try {
    uploadProfilePic(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.post('/verify', async (req, res, next) => {
  try {
    const { user, email } = req.body;
    const number = getRandomNumber(7);
    const alExist = await UserModelDB.exists({ username: user });
    console.log(user, wordIncludes(user));
    if (!alExist && !wordIncludes(user)) {
      const sendMail = {
        from: 'rafpost002@gmail.com',
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.get('/getProfilePic/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const url = `https://res.cloudinary.com/dyjrfa6c2/image/upload/q_25/v${getRandomNumber(
      15
    )}/profilepic/${user}`;
    checkExistsAndResponse(url, res);
  } catch (err) {
    console.log(err);
    res.status(404).send('404');
  }
});
uh.get('/authen', async (req, res, next) => {
  try {
    let jwtToken = req.cookies.jwt;
    console.log(req.cookies.jwt);
    if (!jwtToken) {
      res.status(200).json({
        massage: 'Not Logged In',
        done: false,
      });
    } else {
      const verified = jwt.verify(jwtToken, secret);
      const alExist = await UserModelDB.exists({ _id: verified.id });
      if (verified && alExist) {
        res.status(200).json({
          massage: 'Logged In',
          done: true,
          id: verified.id,
        });
      } else {
        res.status(200).json({
          massage: 'Not Logged In',
          done: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      massage: 'Not Logged In',
      done: false,
    });
  }
});
uh.get('/getUserData/:id', async (req, res, next) => {
  try {
    const userid = req.params.id;
    const isValid = await IdIsValid(userid);
    const alExist = isValid ? await UserModelDB.exists({ _id: userid }) : false;
    if (alExist) {
      UserModelDB.findOne({ _id: userid })
        .select(['-password', '-__v'])
        .then((resp) => {
          res.json({ done: true, user: resp });
        })
        .catch(() => {
          res.status(500).json({ done: false, massage: 'An Unexpected Error!' });
        });
    } else {
      res.json({ done: true, user: null });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.get('/getOwnData', async (req, res, next) => {
  try {
    const id = await getIdFromJwt(req);
    UserModelDB.findOne({ _id: id })
      .populate('groups', ['name', '_id'])
      .select(['-password', '-__v'])
      .then((resp) => {
        res.json({ done: true, user: resp });
      })
      .catch(() => {
        res.status(500).json({ done: false, massage: 'An Unexpected Error!' });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.put('/updateUserData', authen, async (req, res, next) => {
  try {
    const oid = await getIdFromJwt(req);
    const queryId = req.query ? req.query.userid : null;
    let uid;
    let pass;
    if (oid === '61346cba5f69790468c69b2d' || oid === '614ca3dadca93a001614286a') {
      uid = queryId;
    } else {
      uid = oid;
    }
    const fetchedData = await handleFormRequest(req, false, uid);
    if (fetchedData.delPFP === 'true') {
      await deleteImages([uid]);
    }
    if (fetchedData.password) {
      pass = await bcrypt.hash(fetchedData.password, 10);
    }
    const updateData = pass ? { ...fetchedData, password: pass } : fetchedData;
    UserModelDB.findOneAndUpdate({ _id: uid }, updateData, (err) => {
      if (err) {
        res.status(500).json({ err: err, done: false });
      } else {
        res.status(200).json({ done: true });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ done: false, massage: 'A Server Side Error' });
  }
});
uh.post('/verifyForUpdateData', authen, async (req, res) => {
  try {
    const { id, email, username } = req.body;
    console.log(req.body);
    const uexists = await UserModelDB.exists({ username });
    const number = getRandomNumber(6);
    if (uexists || wordIncludes(username || '')) {
      res.json({ done: false, exists: true });
    } else {
      const sendMail = {
        from: 'rafpost002@gmail.com',
        to: email, //change it
        subject: 'RafPost Verification', //change it
        html: `<p>Your Verfication code is <br> <b style="font-size: 1.5rem">${number}</b>  <br> in RafPost Account. Give it to you Verification Input and Update your data.</p>`,
      };
      mailerTransport
        .send(sendMail)
        .then((resp) => {
          res.json({ done: true, exists: false, code: number });
        })
        .catch((err) => {
          console.log(err);
          res.json({ done: false, exists: false });
        });
    }
  } catch (err) {
    console.log(err);
    res.json({ done: false, exists: false, massage: 'Unexpected error!' });
  }
});
uh.post('/verifyForUpdateDataNoAuthen', (req, res) => {
  const { username } = req.body;
  UserModelDB.findOne({ username }, (err, data) => {
    if (err || !data) {
      res.json({ done: false, massage: "User doesn't eists" });
    } else {
      const { email, _id } = data;
      const number = getRandomNumber(6);
      verifyModel.create({ code: number.toString() }, (erro, datar) => {
        if (erro) {
          console.error(erro);
          res.json({ done: false, massage: 'Unexpected Error!' });
        } else {
          const vid = datar._id;
          const sendMail = {
            from: 'rafpost002@gmail.com',
            to: email,
            subject: 'Verfication Mail from Changing Data in RafPost',
            html: `<p>Your Verfication code is <br> <b style="font-size: 1.5rem">${number}</b>  <br> in RafPost Account. Give it to you Verification Input and Change your Password.</p>`,
          };
          mailerTransport
            .send(sendMail)
            .then((resp) => {
              res.json({ done: true, exists: false, vid, user: { email, id: _id } });
            })
            .catch((error) => {
              console.log(error);
              res.json({ done: false, exists: false });
            });
        }
      });
    }
  });
});
uh.put('/changePass', (req, res) => {
  const { id, pass, code, vid } = req.body;
  verifyModel.findOne({ _id: vid }, async (err, data) => {
    if (err || !data) {
      res.json({ done: false, massage: 'Unexpected Error!' });
    } else {
      const mainCode = data.code;
      if (mainCode === code) {
        const hashedPass = await bcrypt.hash(pass, 10);
        UserModelDB.findOneAndUpdate({ _id: id }, { password: hashedPass }, (err) => {
          if (err) {
            res.json({ done: false, massage: 'Unexpected Error!' });
          } else {
            verifyModel.findOneAndDelete({ _id: vid }, (err) => {
              if (err) {
                res.json({ done: false, massage: 'Unexpected Error!' });
              } else {
                res.json({ done: true });
              }
            });
          }
        });
      } else {
        res.json({ done: false, massage: "Code Aren't Same" });
      }
    }
  });
});
module.exports = uh;
