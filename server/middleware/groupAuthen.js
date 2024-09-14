const jwt = require('jsonwebtoken');
const secret = process.env['TOKEN'];
const userModel = require('../Database/UserModel');

const gauthen = async (req, res, next) => {
  if (req.query.grpId || req.body.grpId) {
    let jwtToken = req.cookies.jwt;
    if (!jwtToken) {
      res.status(403).json({
        massage: 'Not Logged In',
        done: false,
      });
    } else {
      try {
        const verified = jwt.verify(jwtToken, secret);
        const alExist = await userModel.findOne({
          _id: verified.id,
        });

        const grpID = req.query.grpId || req.body.grpId;

        console.log('TUTU:', alExist.groups);

        if (verified && alExist.groups.includes(grpID)) {
          req.userID = verified.alExist;
          next();
        } else {
          res.status(403).json({
            massage: 'Not In Group',
            done: false,
            nonMember: true,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(403).json({
          massage: 'Not Logged In',
          done: false,
          nonMember: true,
        });
      }
    }
  } else {
    next();
  }
};
module.exports = gauthen;
