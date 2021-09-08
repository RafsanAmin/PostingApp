const jwt = require('jsonwebtoken');
const secret = process.env['TOKEN'];
const authen = (req, res, next) => {
  let jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    res.status(403).json({
      massage: 'Not Logged In',
      done: false,
    });
  } else {
    const verified = jwt.verify(jwtToken, secret);
    if (verified) {
      next();
    } else {
      res.status(403).json({
        massage: 'Not Logged In',
        done: false,
      });
    }
  }
};
module.exports = authen;
