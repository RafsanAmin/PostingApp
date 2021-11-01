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
        <link rel="icon" href="/icon_32.png" />
        <link rel="manifest" href="/manifest.json" />
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
          zIndex: 1,
          pointerEvents: 'none-=',
        }}
      >
        Alpha v0.2.34
        <br />
        It is not finished yet so it is missing many features and has major issues
      </p>
    </>
  );
}

export default MyApp;
