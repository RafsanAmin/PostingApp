/* eslint-disable react/jsx-props-no-spreading */
import '../../public/fav/all.min.css';
import '../styles/css/login.css';
import '../styles/css/signup.css';
import '../styles/css/uicomps.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
