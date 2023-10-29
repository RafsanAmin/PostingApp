import axios from 'axios';
import makeFormData from '../utils/formData';
import { mailRegexp } from '../utils/stringRegexp';
import userDataValidator from '../utils/userDataValidator';
import urlPrefix from './getURL';

const Axios = axios.create({ baseURL: urlPrefix });

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);

class UserAuthenAPIClass {
  uploadProfilePic = (files, user) =>
    new Promise((resolve, reject) => {
      if (!files) {
        resolve(true);
      } else {
        const formData = new FormData();
        formData.append('username', user);
        formData.append('profile-pic', files);

        Axios.post(`/uh/addProfilePic`, formData).then((res) => {
          if (res.data.success) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      }
    });

  login = ({ username, password, remMe }) =>
    new Promise((resolve, reject) => {
      Axios.get(`/uh/login`, {
        params: {
          username,
          password,
          remMe,
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.status !== 200) {
            if (!res.data.massage) {
              reject({ data: { massage: 'An unexpected error occured' } });
            } else {
              reject(res);
            }
          } else {
            resolve(res.data);
          }
        })
        .catch(() => {
          reject({ err: { massage: 'An Unexpected Error Occured' } });
        });
    });

  authen = () =>
    new Promise((resolve, reject) => {
      Axios.get(`/uh/authen`, { withCredentials: true })
        .then((res) => {
          if (res.data.done === true) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch(() => {
          reject('Error');
        });
    });

  signUp = (newUser) =>
    new Promise((resolve, reject) => {
      const { user, pass, eml, profilePic, confPass } = newUser;
      const username = user.trim();
      const password = pass.trim();
      const confirmPassword = confPass.trim();
      const email = eml.trim();
      if (username !== '' || password !== '' || email !== '') {
        if (password.length < 8) {
          reject({
            data: { massage: 'Password Must Be more Than 8 Characters' },
          });
        } else if (password.length > 64 || email.length > 64 || username.length > 64) {
          reject({ data: { massage: 'Give everything less than 64 characters.' } });
        } else if (!mailRegexp.test(email)) {
          reject({ data: { massage: 'Give Valid Email' } });
        } else if (password !== confirmPassword) {
          reject({
            data: { massage: 'Password and Confirm Password are not equal' },
          });
        } else {
          const sendData = {
            username,
            password,
            email,
            likedPosts: [],
          };
          Axios.post(`/uh/signup`, sendData).then((res) => {
            if (res.data.exists === false && res.data.done === true) {
              this.uploadProfilePic(profilePic, res.data.id).then((resp) => {
                if (!resp) {
                  reject({ data: { massage: 'Cannot Upload Photo' } });
                } else {
                  resolve(res.data);
                }
              });
            } else {
              reject(res);
            }
          });
        }
      } else {
        reject({ data: { massage: 'Everything is Required' } });
      }
    });

  logout = () =>
    new Promise((resolve, reject) => {
      Axios.get(`/uh/logout`, { withCredentials: true }).then((res) => {
        if (res.data.done) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });

  verifyMail = (newUser) =>
    new Promise((resolve, reject) => {
      const { user, pass, eml, confPass } = newUser;
      const username = user.trim();
      const password = pass.trim();
      const confirmPassword = confPass.trim();
      const email = eml.trim();
      if (username && password && email) {
        if (password.length < 8) {
          reject({
            data: { massage: 'Password Must Be more Than 8 Characters' },
          });
        } else if (!mailRegexp.test(email)) {
          reject({ data: { massage: 'Give Valid Email' } });
        } else if (password !== confirmPassword) {
          reject({
            data: { massage: 'Password and Confirm Password are not equal' },
          });
        } else {
          const sendData = {
            user,
            email,
          };
          Axios.post(`/uh/verify`, sendData).then((res) => {
            if (res.data.success && !res.data.exists) {
              resolve(res.data);
            } else {
              reject(res);
            }
          });
        }
      } else {
        reject({ data: { massage: 'Everything is Required' } });
      }
    });

  getUserInfo = (id) =>
    new Promise((resolve, reject) => {
      Axios.get(`/uh/getUserData/${id}`).then((res) => {
        if (res.data.done) {
          resolve(res.data.user);
        } else {
          reject(res.data.massage);
        }
      });
    });

  getOwnInfo = () =>
    new Promise((resolve, reject) => {
      Axios.get(`/uh/getOwnData`, { withCredentials: true }).then((res) => {
        if (res.data.done) {
          resolve(res.data.user);
        } else {
          reject(res.data.massage);
        }
      });
    });

  verifyForUpdateData = (data, noCookieAuthen) =>
    new Promise((resolve, reject) => {
      userDataValidator(data)
        .then(() => {
          const { id, email, username } = data;
          const sendData = {
            id,
            email,
            username,
          };

          Axios.post(
            noCookieAuthen ? `/uh/verifyForUpdateDataNoAuthen` : `/uh/verifyForUpdateData`,
            sendData
          ).then((res) => {
            if (res.data && res.data.exists) {
              reject('Username already exists!');
            } else if (res.data.done && res.data.code) {
              resolve(res.data.code);
            } else if (!res.data.done && res.data.massage) {
              reject(res.data.massage);
            } else if (res.data.done && res.data.vid) {
              resolve({ vid: res.data.vid, user: res.data.user });
            } else {
              reject('Unexpected Error!');
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });

  updateUserDataWithVer = ({ bDay, bio, delPFP, email, id, pass, pfp, username, work }) =>
    new Promise((resolve, reject) => {
      console.log({
        bDay,
        bio,
        delPFP,
        email,
        id,
        pass,
        pfp,
        username,
        work,
      });
      makeFormData({ bDay, bio, delPFP, email, id, password: pass, pfp, username, work }).then(
        (formData) => {
          Axios.put(`/uh/updateUserData`, formData, {
            withCredentials: true,
            params: {
              userid: id,
            },
          })
            .then((res) => {
              if (res.data && res.data.done) {
                resolve('Updated Successfully! Wait minimum for 5 seconds before reload.');
              } else {
                reject('There was an error!');
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });

  updateUserDataNoVer = (data) =>
    new Promise((resolve, reject) => {
      const { bDay, bio, delPFP, id, pfp, work } = data;
      makeFormData({ bDay, bio, delPFP, id, pfp, work })
        .then((formData) => {
          Axios.put(`/uh/updateUserData`, formData, {
            withCredentials: true,
            params: {
              userid: data.id,
            },
          }).then((res) => {
            if (res.data && res.data.done) {
              resolve('Updated Successfully! Wait minimum for 5 seconds before reload.');
            } else {
              reject('There was an error!');
            }
          });
        })
        .catch((err) => {
          reject('There was an error');
        });
    });

  changePass = (data) =>
    new Promise((resolve, reject) => {
      Axios.put('/uh/changePass', data).then((res) => {
        if (res.data && res.data.done) {
          resolve('Password Successfully Changed!');
        } else {
          reject(res.data.massage || 'Unexpected Error!');
        }
      });
    });

  log = (data) => {
    Axios.get('/log', {
      params: {
        msg: data,
      },
    });
  };
}
const UserAuthenAPI = new UserAuthenAPIClass();
export default UserAuthenAPI;
