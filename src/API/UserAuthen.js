import Axios from 'axios';
import urlPrefix from './getURL';

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);

class UserAuthenAPIClass {
  urlPrefix = urlPrefix;

  uploadProfilePic = (files, user) =>
    new Promise((resolve, reject) => {
      console.log(files);
      if (!files) {
        resolve(true);
      } else {
        const formData = new FormData();
        formData.append('username', user);
        formData.append('profile-pic', files);

        Axios.post(`${this.urlPrefix}/uh/addProfilePic`, formData).then((res) => {
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
      console.log(this.urlPrefix);
      Axios.get(`${this.urlPrefix}/uh/login`, {
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
      Axios.get(`${this.urlPrefix}/uh/authen`, { withCredentials: true })
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
          Axios.post(`${this.urlPrefix}/uh/signup`, sendData).then((res) => {
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
      Axios.get(`${this.urlPrefix}/uh/logout`, { withCredentials: true }).then((res) => {
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
          Axios.post(`${this.urlPrefix}/uh/verify`, sendData).then((res) => {
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
}
const UserAuthenAPI = new UserAuthenAPIClass();
export default UserAuthenAPI;
