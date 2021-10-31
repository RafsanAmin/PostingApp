import Document, { Head, Html, Main, NextScript } from 'next/document';

class PostApp extends Document {
  render() {
    return (
      <>
        <Html>
          <Head>
            <meta name="application-name" content="Rafpost" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Rafpost" />
            <meta name="msapplication-TileColor" content="#F7F7F7" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://rafpost.herokuapp.com" />
            <meta name="twitter:title" content="Rafpost" />
            <meta name="twitter:description" content="Best  App in the world" />
            <meta name="twitter:creator" content="@RafsanAmin" />
            <meta property="twitter:image" content="https://rafpost.herokuapp.com/icon_192.png" />
            <link rel="icon" href="/icon_32.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-icon" href="/icon_192.png" />
            <link rel="shortcut icon" href="/icon_32.png" />
            <meta name="theme-color" content="#fff" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Rafpost" />
            <meta property="og:description" content="Best PWA App in the world" />
            <meta property="og:site_name" content="Rafpost" />
            <meta property="og:url" content="https://rafpost.herokuapp.com" />
            <meta property="og:image" content="https://rafpost.herokuapp.com/icon_192.png" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}
export default PostApp;
