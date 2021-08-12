import Axios from 'axios';
import urlPrefix from './getURL';

const postAPI = {
  addPost: (postData) =>
    new Promise((resolve, reject) => {
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
        Axios.post(`${urlPrefix}/pH/addPost`, formData, {
          withCredentials: true,
        }).then((res) => {
          if (res.data) {
            resolve(res.data.done);
          } else {
            reject(res.data.massage);
          }
        });
      } else {
        const err = 'There is no text in post.';
        reject(err);
      }
    }),
};

export default postAPI;
