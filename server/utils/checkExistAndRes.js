const Axios = require('axios');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const checkExistsAndResponse = (link, resp) => {
  Axios.get(link, { responseType: 'arraybuffer' })
    .then((res) => {
      if (res.status === 200) {
        resp.contentType(res.headers['content-type']);
        resp.send(res.data);
      } else {
        resp.contentType('image/svg+xml');
        resp.status(200).sendFile(appDir + '/public/user.svg');
      }
    })
    .catch((err) => {
      resp.contentType('image/svg+xml');
      resp.status(200).sendFile(appDir + '/public/user.svg');
    });
};

module.exports = checkExistsAndResponse;
