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
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:regular,italic,700,700italic"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Component {...pageProps} />

      {/* <p
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
        Alpha v{Package.version} {Package.description}
        <br />
        It is not finished yet so it is missing many features and has major issues.
      </p> */}
    </>
  );
}

export default MyApp;
