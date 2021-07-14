/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import '../../public/fav/all.min.css';
import '../scss/global.scss';
import '../scss/login.scss';
import '../scss/signup.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/user.svg" />
      </Head>
      <Component {...pageProps} />
      <p
        style={{
          position: 'fixed',
          bottom: 0,
          right: '2%',
          fontSize: '0.75rem',
          maxWidth: '50%',
          textAlign: 'right',
        }}
      >
        Indev v0.3.6
        <br />
        It is not finished yet so it is missing many features and has major issues
      </p>
    </>
  );
}

export default MyApp;
