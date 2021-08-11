import Axios from 'axios';
import urlPrefix from './getURL';

const postAPI = {
  addPost: (postData) =>
    new Promise((resolve) => {
      const formData = new FormData();
      const { text, images, date } = postData;
      formData.append('text', text);
      formData.append('date', date);
      if (images) {
        images.forEach((val, index) => {
          formData.append(`images${index}`, val);
        });
      }
      console.log(postData);
      Axios.post(`${urlPrefix}/pH/addPost`, formData).then((res) => {
        resolve(res.data);
      });
    }),
};

export default postAPI;
