import axios from 'axios';
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
const postAPI = {
  postLimit: 15,
  addPost(postData) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const { text, images, date, grpID } = postData;
      const texta = text.trim();
      if (texta) {
        formData.append('text', texta);
        formData.append('date', date);
        if (grpID) {
          formData.append('grpID', grpID);
        } else {
          formData.append('personal', 'true');
        }
        if (images) {
          images.forEach((val, index) => {
            formData.append(`images${index}`, val);
          });
        }
        Axios.post(`/pH/addPost`, formData, {
          withCredentials: true,
        })
          .then((res) => {
            if (res.data.done) {
              setTimeout(() => {
                resolve(res.data.done);
              }, 5000);
            } else {
              reject(res.data.massage);
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
  getPostLatest: (before, limit, grpID) =>
    new Promise((resolve, reject) => {
      Axios.get(`/pH/getPostsByDate`, { params: { limit, before, grpID } })
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    }),
  getPostById: (pid) =>
    new Promise((resolve, reject) => {
      Axios.get(`/pH/getPost`, { params: { pid } })
        .then((res) => {
          if (res.data) {
            if (res.data.done) {
              resolve(res.data.post);
            } else {
              reject({ massage: res.data.massage, code: res.data.code });
            }
          } else {
            reject({ massage: 'Unexpected Error', code: '500' });
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    }),
  getPostofUser(limit, before, user) {
    return new Promise((resolve, reject) => {
      const add = user === 'own' ? 'getPostsMine' : 'getPostsByUser';

      Axios.get(`/pH/${add}`, {
        params: { limit, before, uid: user },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPost(type, before, limit, user, grpID) {
    return new Promise((resolve, reject) => {
      if (type === 'latest') {
        this.getPostLatest(before, limit, grpID)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (type === 'user') {
        this.getPostofUser(limit, before, user)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject({ massage: 'Internal Error' });
      }
    });
  },
  deletePost(post) {
    return new Promise((resolve, reject) => {
      Axios.post(`/pH/deletePost`, { data: post }, { withCredentials: true })
        .then((res) => {
          if (res.data.done) {
            resolve(res.data.massage);
          } else {
            reject(res.data.massage);
          }
        })
        .catch((err) => {
          reject('Unexpected Error!');
        });
    });
  },
  updatePost(postData) {
    return new Promise((resolve, reject) => {
      const { text, oldPhotos, images, id, date } = postData;
      const texte = text.trim();
      if (texte) {
        const dPhotos = oldPhotos.filter((arr) => !images.includes(arr));
        const keepPhotos = oldPhotos.filter((arr) => images.includes(arr));
        const uploadPhotos = images.filter((arr) => typeof arr === 'object');
        const formData = new FormData();
        formData.append('text', texte);
        formData.append('id', id);
        formData.append('date', date);
        dPhotos.forEach((arr, index) => {
          formData.append(`dPhotos${index}`, arr);
        });
        keepPhotos.forEach((arr, index) => {
          formData.append(`kPhotos${index}`, arr);
        });
        uploadPhotos.forEach((arr, index) => {
          formData.append(`image${index}`, arr);
        });
        Axios.put('/pH/updatePost', formData, { withCredentials: true })
          .then((res) => {
            if (res.data.done) {
              resolve(res.data.massage);
            } else {
              reject(res.data.massage);
            }
          })
          .catch((err) => {
            reject('Unexpected Error!');
          });
      } else {
        reject('There is not text in post.');
      }
    });
  },
};

export default postAPI;
