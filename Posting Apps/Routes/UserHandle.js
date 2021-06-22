const UserModelDB = require("../Database/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const uh = express.Router();
const authen = require("../middleware/authen");
const ENV = require("dotenv").config({ path: __dirname + "../../.env" });
const secret = process.env["TOKEN"];
const pass = process.env["PASSWORD"];
const multer = require("multer");
const path = require("path");
const { MulterError } = require("multer");
const mailerTransport = require("@sendgrid/mail");
const randomNumber = require("../../library/randomNumber");
mailerTransport.setApiKey(pass);
uh.use(cookieParser());
uh.use(express.json());
const diskStrorage = multer.diskStorage({
  destination: "./static/imgProfile",
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const finalName = `${req.body.username}${fileExt}`;
    cb(null, finalName);
  },
});
const uploadProfilePic = multer({ storage: diskStrorage }).single(
  "profile-pic",
);
uh.get("/login", async (req, res, next) => {
  // console.log(req.csrfToken());
  let { username, password, remMe } = req.query;
  await UserModelDB.findOne({ username }, async (err, data) => {
    if (!data) {
      res
        .status(401)
        .json({ massage: "User Doesn't Exists", done: false, exists: false });
    } else {
      let Foundpassword = data.password;
      let id = data._id;
      let passm = await bcrypt
        .compare(password, Foundpassword)
        .catch((err) => console.log(err));
      if (passm) {
        let scrt = jwt.sign({ id }, secret);
        if (remMe === "true") {
          res.cookie("jwt", scrt, {
            maxAge: 900000000,
            httpOnly: true,
          });
        } else {
          res.cookie("jwt", scrt, {
            httpOnly: true,
          });
        }
        res.status(200).json({ massage: "Done", done: true, exists: true });
        // sameSite: "lax", include at deploy
      } else {
        res.status(401).json({
          massage: "Password is not correct!",
          done: false,
          exists: true,
        });
      }
    }
  });
});
uh.get("/logout", async (req, res, next) => {
  const remMeBool = req.cookies._rem;
  if (remMeBool === "false") {
    res.clearCookie("jwt");
    res.clearCookie("_rem");
    res.send("OK");
  } else {
    res.send("not OK");
  }
});
uh.post("/signup", async (req, res, next) => {
  // console.log(req.csrfToken());
  let { username, password, email, likedPosts, profilePic } = req.body;
  let alExist = await UserModelDB.exists({ username: username });
  if (!alExist) {
    let sPass = await bcrypt.hash(password, 10);
    let newUserData = {
      username,
      password: sPass,
      email,
      likedPosts,
      profilePic,
    };
    await UserModelDB.create(newUserData, (err, data) => {
      if (err) {
        res.status(500).json({
          massage: "User Cant Be Added For Server Side Error",
          done: false,
          exists: false,
        });
      } else {
        let userID = data._id;
        res.status(200).json({
          massage: "User Added",
          done: true,
          exists: false,
          id: userID,
        });
      }
    });
  } else {
    res.json({ massage: "User Already Exists", success: false, exists: true });
  }
});
uh.post("/addProfilePic", async (req, res, next) => {
  uploadProfilePic(req, res, (err) => {
    if (err instanceof MulterError) {
      console.log(err);
      res.json({ success: false, massage: `${err}` });
    }
  });
  res.json({ success: true, massage: "SuccessFully Uploaded" });
});
uh.post("/verify", async (req, res, next) => {
  const { user, email } = req.body;
  const number = randomNumber(7);
  let alExist = await UserModelDB.exists({ username: user });
  console.log(user);
  if (!alExist) {
    const sendMail = {
      from: "rafpost001@gmail.com",
      to: email,
      subject: "Your Verfication Code in RafPost",
      html: `<p>Your Verfication code is <br> <b style="font-size: 1.5rem">${number}</b>  <br> in RafPost Account. Give it to you Verification Input and Create your Account</p>`,
    };
    try {
      await mailerTransport.send(sendMail);
      res.json({
        massage: "Verification Mail Send",
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
    res.json({ massage: "User Already Exists", success: false, exists: true });
  }
});
uh.get("/authen", authen);

module.exports = uh;
