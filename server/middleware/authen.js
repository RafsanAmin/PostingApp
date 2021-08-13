const jwt = require('jsonwebtoken');
const secret = process.env['TOKEN'];
const authen = async (req, res, next) => {
  let jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    res.status(200).json({
      massage: 'Not Logged In',
      done: false,
    });
  } else {
    const verified = jwt.verify(jwtToken, secret);
    if (verified) {
      res.status(200).json({
        massage: 'Logged In',
        done: true,
      });
    } else {
      res.status(200).json({
        massage: 'Not Logged In',
        done: false,
      });
    }
  }
};
module.exports = authen;
