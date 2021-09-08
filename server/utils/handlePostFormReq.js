// const handleUpdatePost = (req, res) => {
//   return new Promise((resolve, reject) => {
//     const r = { text: null, date: null, id: null, dPhotos: [], kPhotos: [] };
//     req.pipe(req.busboy);
//   });
// };
const cloudinary = require('cloudinary').v2;
const { getRandomString } = require('../../library/random');
const handlePostFormReq = (req, s) => {
  return new Promise((resolve, reject) => {
    const r = {};
    r.photos = [];
    if (s === 'update') {
      r.dPhotos = [];
      r.kPhotos = [];
    }
    req.pipe(req.busboy);
    req.busboy.on('field', (fieldname, val) => {
      console.log(typeof val, val, fieldname);
      if (fieldname.includes('dPhotos')) {
        r.dPhotos.push(val);
      } else if (fieldname.includes('kPhotos')) {
        r.kPhotos.push(val);
      } else {
        r[fieldname] = val;
      }
    });
    req.busboy.on('file', (fieldname, file, filename) => {
      console.log('Hello');
      const fileName = getRandomString(12);
      r.photos.push(fileName);
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'profilepic',
          use_filename: true,
          overwrite: true,
          filename_override: fileName,
          unique_filename: false,
          resource_type: 'auto',
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      file.pipe(uploadStream);
    });
    req.busboy.on('finish', () => {
      resolve(r);
    });
  });
};
module.exports = handlePostFormReq;
