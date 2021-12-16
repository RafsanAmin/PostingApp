const cloudinary = require('cloudinary').v2;

const deleteImages = (arr) => {
  return new Promise((res, rej) => {
    console.log(arr);
    if (arr) {
      if (arr.length > 0) {
        const length = arr.length;
        let done = 0;
        arr.forEach((img) => {
          cloudinary.uploader.destroy(`profilepic/${img}`, {invalidate: true}, (err) => {
            if (err) {
              rej(false);
            } else {
              done++;
              if (done === length) {
                res(true);
              }
            }
          });
        });
      } else {
        res(true);
      }
    } else {
      res(true);
    }
  });
};
module.exports = deleteImages;
