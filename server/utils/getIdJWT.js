const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN;
const getIdFromJwt = (req) => {
  return new Promise((resolve, reject) => {
    let jwtToken = req.cookies.jwt;
    console.log(req.cookies.jwt);
    if (!jwtToken) {
      reject(null);
    } else {
      const verified = jwt.verify(jwtToken, secret);
      if (verified) {
        resolve(verified.id);
      } else {
        reject(null);
      }
    }
  });
};
module.exports = getIdFromJwt;
