const urlPrefix =
  process.env.NODE_ENV !== 'development'
    ? `http://${process.env.NEXT_PUBLIC_URL}/`
    : 'http://localhost';
export default urlPrefix;
