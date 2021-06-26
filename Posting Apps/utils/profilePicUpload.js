const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const stream = require("streamifier");
const path = require("path");
const ENV = require("dotenv").config({ path: __dirname + "../../.env" });
cloudinary.config({
  cloud_name: process.env["CLOUD_NAME"],
  api_key: process.env["API_KEY"],
  api_secret: process.env["API_SECRET"],
  secure: true,
});
const uploadProfilePicConfig = multer({
  storage: multer.memoryStorage(),
}).single("profile-pic");
const uploadProfilePic = (req, res) => {
  uploadProfilePicConfig(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.json({ success: false, massage: `${err}` });
    }
    const fileExt = path.extname(req.file.originalname);
    const finalName = `${req.body.username}${fileExt}`;
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profilepic",
        use_filename: true,
        overwrite: true,
        filename_override: req.body.username,
        unique_filename: false,
        resource_type: "auto",
      },
      () => {
        res.json({ success: true, massage: "hello" });
      },
    );
    stream.createReadStream(req.file.buffer).pipe(uploadStream);
  });
};
module.exports = uploadProfilePic;
