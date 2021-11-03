import axios from 'axios';
import urlPrefix from './getURL';

const Axios = axios.create({ baseURL: urlPrefix });

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);

const mailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(google|outlook|hotmail|gmail)+(?:\.(com|org|io)+)*$/;
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
          if (res.data.done === true || res.data.done === false) {
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

  updateUserDataNoVer = ({ bio, work, bDay }) =>
    new Promise((resolve, reject) => {
      Axios.put(`/uh/updateUserDataNoVer`, { bio, work, bDay }, { withCredentials: true }).then(
        (res) => {
          if (res.data && res.data.done) {
            resolve('Updated Successfully!');
          } else {
            reject('There was an error!');
          }
        }
      );
    });
}
const UserAuthenAPI = new UserAuthenAPIClass();
export default UserAuthenAPI;
