const makeFormData = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const formData = new FormData();
      for (let property in data) {
        console.log(property);
        formData.append(property, data[property]);
      }
      resolve(formData);
    } catch (err) {
      reject(err);
    }
  });
};

export { makeFormData };
