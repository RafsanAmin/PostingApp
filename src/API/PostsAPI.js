import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => response,
  (err) => err.response
);
Axios.interceptors.request.use(
  (response) => response,
  (err) => err
);
const { CancelToken } = Axios;
const source = CancelToken.source();
const postAPI = {
  postLimit: 15,
  addPost(postData) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const { text, images, date } = postData;
      const texta = text.trim();
      if (texta) {
        formData.append('text', texta);
        formData.append('date', date);
        if (images) {
          images.forEach((val, index) => {
            formData.append(`images${index}`, val);
          });
        }
        Axios.post(`/pH/addPost`, formData, {
          withCredentials: true,
          cancelToken: source.token,
        }).then((res) => {
          console.log(res);
          if (res.data.done) {
            setTimeout(() => {
              resolve(res.data.done);
            }, 5000);
          } else {
            reject(res.data.massage);
          }
        });
      } else {
        const err = 'There is no text in post.';
        reject(err);
      }
    });
  },
  getPostLatest: (before, limit) =>
    new Promise((resolve, reject) => {
      Axios.get(`/pH/getPostsByDate`, { params: { limit, before } }).then((res) => {
        if (res.data) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      });
    }),
  getPostById: (pid) =>
    new Promise((resolve, reject) => {
      Axios.get(`/pH/getPost`, { params: { pid } }).then((res) => {
        if (res.data) {
          if (res.data.done) {
            resolve(res.data.post);
          } else {
            reject({ massage: res.data.massage, code: res.data.code });
          }
        } else {
          reject({ massage: 'Unexpected Error', code: '500' });
        }
      });
    }),
  getPostofUser(limit, before, user) {
    return new Promise((resolve, reject) => {
      const add = user === 'own' ? 'getPostsMine' : 'getPostsByUser';

      Axios.get(`/pH/${add}`, {
        params: { limit, before, uid: user },
        withCredentials: true,
      }).then((res) => {
        if (res.data) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getPost(type, before, limit, user) {
    return new Promise((resolve, reject) => {
      if (type === 'latest') {
        this.getPostLatest(before, limit)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (type === 'user') {
        this.getPostofUser(limit, before, user)
          .then((res) => {
            console.log(res);
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
          console.log(err);
        });
    });
  },
  updatePost(postData) {
    return new Promise((resolve, reject) => {
      console.log(postData);
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
        Axios.put('/pH/updatePost', formData, { withCredentials: true }).then((res) => {
          if (res.data.done) {
            resolve(res.data.massage);
          } else {
            reject(res.data.massage);
          }
        });
      } else {
        reject('There is not text in post.');
      }
    });
  },
};

export default postAPI;
