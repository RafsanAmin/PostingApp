const express = require("express");
const postModel = require("../Database/PostModel");
const userModelDB = require("../Database/UserModel");
const pH = express.Router();
const busboy = require("connect-busboy");
const cloudinary = require("cloudinary").v2;
const { getRandomString } = require("../../library/random");
const secret = process.env["TOKEN"];
const jwt = require("jsonwebtoken");
pH.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  }),
);
const handlePostRequest = (req, res) => {
  return new Promise((resolve, reject) => {
    const r = { text: null, date: null, photos: [] };
    req.pipe(req.busboy);
    req.busboy.on("field", (fieldname, val) => {
      r[fieldname] = val;
    });
    req.busboy.on("file", (fieldname, file, filename) => {
      console.log("Hello");
      const fileName = getRandomString(12);
      r.photos.push(fileName);
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "profilepic",
          use_filename: true,
          overwrite: true,
          filename_override: fileName,
          unique_filename: false,
          resource_type: "auto",
        },
        () => {},
      );
      file.pipe(uploadStream);
    });
    req.busboy.on("finish", () => {
      resolve(r);
    });
  });
};
pH.post("/addPost", async (req, res) => {
  const data = await handlePostRequest(req, res);
  const UID = jwt.verify(req.cookies.jwt, secret);
  if (UID) {
    const uid = UID.id;
    const newPost = { ...data, likes: [], uid };
    postModel.create(newPost, (err, data) => {
      res.status(200).json({ done: true, massage: "Done Bro!" });
    });
  } else {
    res.status(403).json({ done: false, massage: "User Not Logged In" });
  }
});

module.exports = pH;
