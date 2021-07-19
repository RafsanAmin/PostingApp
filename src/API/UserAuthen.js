/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);

class UserAuthenAPIClass {
  getURL = () => {
    if (process.env.NODE_ENV !== 'development') {
      return 'https://rafpost.herokuapp.com';
    }
    return '';
  };

  uploadProfilePic = (files, user) =>
    new Promise((resolve, reject) => {
      console.log(files);
      if (!files) {
        resolve(true);
      } else {
        const formData = new FormData();
        formData.append('username', user);
        formData.append('profile-pic', files);

        Axios.post(`${this.getURL()}/uh/addProfilePic`, formData).then((res) => {
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
      console.log(this.getURL());
      Axios.get(`${this.getURL()}/uh/login`, {
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
      Axios.get(`${this.getURL()}/uh/authen`, { withCredentials: true })
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
        } else if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        ) {
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
            profilePic: '',
          };
          Axios.post(`${this.getURL()}/uh/signup`, sendData).then((res) => {
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
      Axios.get(`${this.getURL()}/uh/logout`, { withCredentials: true }).then((res) => {
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
      if (username !== '' || password !== '' || email !== '') {
        if (password.length < 8) {
          reject({
            data: { massage: 'Password Must Be more Than 8 Characters' },
          });
        } else if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        ) {
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
          Axios.post(`${this.getURL()}/uh/verify`, sendData).then((res) => {
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

  getProfilePicPath = () =>
    new Promise((resolve, reject) => {
      Axios.get(`${this.getURL()}/uh/getProfilePicLink`, { withCredentials: true })
        .then((res) => {
          const data = res.data.url;
          if (data) {
            resolve(res.data.url);
          } else {
            reject({ msg: 'an error occured' });
          }
        })
        .catch({ msg: 'An Error Occured' });
    });
}
const UserAuthenAPI = new UserAuthenAPIClass();
export default UserAuthenAPI;
