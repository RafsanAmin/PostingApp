const express = require("express");
const postModel = require("../Database/PostModel");
const pH = express.Router();
const busboy = require("connect-busboy");
const cloudinary = require("cloudinary").v2;
const { getRandomString } = require("../../library/random");
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
  const ret = await handlePostRequest(req, res);
  console.log(ret);
  res.end("Hello");
});

module.exports = pH;
