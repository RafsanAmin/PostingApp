const jwt = require('jsonwebtoken');
const secret = process.env['TOKEN'];
const UserModelDB = require('../Database/UserModel');
const authen = async (req, res, next) => {
  let jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    res.status(403).json({
      massage: 'Not Logged In',
      done: false,
    });
  } else {
    try {
      const verified = jwt.verify(jwtToken, secret);
      const alExist = await UserModelDB.findOne({ _id: verified.id });
      console.log(alExist);
      if (verified && alExist) {
        req.userID = verified.alExist;
        next();
      } else {
        res.status(403).json({
          massage: 'Not Logged In',
          done: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({
        massage: 'Not Logged In',
        done: false,
      });
    }
  }
};
module.exports = authen;
