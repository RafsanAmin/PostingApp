/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Package from '../../package.json';
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
        <link
          href="https://fonts.googleapis.com/css?family=Jost:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:regular,italic,700,700italic"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:300,300italic,regular,italic,500,500italic,700,700italic"
          rel="stylesheet"
        />
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
        Alpha v{Package.version} {Package.description}
        <br />
        It is not finished yet so it is missing many features and has major issues.
      </p>
    </>
  );
}

export default MyApp;
