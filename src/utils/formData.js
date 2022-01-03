/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const makeFormData = (data) =>
  new Promise((resolve, reject) => {
    try {
      const formData = new FormData();

      for (const property in data) {
        console.log(property);
        formData.append(property, data[property]);
      }
      resolve(formData);
    } catch (err) {
      reject(err);
    }
  });

export default makeFormData;
