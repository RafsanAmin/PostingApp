import axios from 'axios';
import UserAuthenAPI from './UserAuthen';
import urlPrefix from './getURL';

const Axios = axios.create({ baseURL: urlPrefix });

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);
Axios.interceptors.request.use(
  (response) => response,
  (err) => err
);
const groupAPI = {
  createGroup(data) {
    return new Promise((resolve, reject) => {
      const { name, desc, pfp } = data;
      const texta = name.trim();
      const desca = desc.trim();
      if (texta) {
        Axios.post(
          `/gh/createGroup`,
          { name: texta, desc: desca },
          {
            withCredentials: true,
          }
        )
          .then(async (res) => {
            if (res.data.done) {
              await UserAuthenAPI.uploadProfilePic(pfp, res.data.id);
              resolve(res.data.done);
            } else {
              reject(res.data.msg);
            }
          })
          .catch((err) => {
            reject('Unexpected Error!');
          });
      } else {
        const err = 'There is no text in post.';
        reject(err);
      }
    });
  },
  joinGroup(grpId) {
    return new Promise((resolve, reject) => {
      Axios.post(
        `/gh/joinGroup`,
        { grpId },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          if (res.data.done) {
            setTimeout(() => {
              resolve(res.data.done);
            }, 5000);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    });
  },
  exitGroup(grpId) {
    return new Promise((resolve, reject) => {
      Axios.post(
        `/gh/exitGroup`,
        { grpId },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          if (res.data.done) {
            setTimeout(() => {
              resolve(res.data.done);
            }, 1000);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    });
  },
  getData(grpId) {
    return new Promise((resolve, reject) => {
      Axios.get(
        `/gh/info`,
        { params: { grpId } },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          if (res.data.done) {
            setTimeout(() => {
              resolve(res.data);
            }, 1000);
          } else {
            reject(res.data.msg);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    });
  },
};

export default groupAPI;
