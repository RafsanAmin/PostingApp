const urlPrefix =
  process.env.NODE_ENV !== 'development'
    ? `https://${process.env.NEXT_PUBLIC_URL}/`
    : 'http://localhost';
export default urlPrefix;
