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
    </>
  );
}

export default MyApp;
