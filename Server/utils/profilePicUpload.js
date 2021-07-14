const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: __dirname + "../../.env" });
cloudinary.config({
  cloud_name: process.env["CLOUD_NAME"],
  api_key: process.env["API_KEY"],
  api_secret: process.env["API_SECRET"],
  secure: true,
});
const uploadProfilePic =(req, res) => {
  console.log(req.body);
  req.pipe(req.busboy);
  req.busboy.on('field', (fieldname, val) => {
    req.body[fieldname] = val;
  })
  req.busboy.on('file', (fieldname, file, filename) => {
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
    file.pipe(uploadStream);
  })
} 
module.exports = uploadProfilePic;
