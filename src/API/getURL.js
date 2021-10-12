const urlPrefix =
  process.env.NODE_ENV !== 'development' ? 'https://rafpost.herokuapp.com' : 'http://localhost';
export default urlPrefix;
