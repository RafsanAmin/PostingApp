const withPWA = require('next-pwa');

const config =
  process.env.NODE_ENV === 'development'
    ? { reactStrictMode: true, pageExtensions: ['js'], distDir: 'build' }
    : withPWA({
        reactStrictMode: true,
        pageExtensions: ['js'],
        distDir: 'build',
        pwa: {
          dest: 'public',
          swSrc: 'sw.js',
          dynamicStartUrl: true,
          dynamicStartUrlRedirect: '/App/Post',
          disable: process.env.NODE_ENV === 'development',
        },
      });
module.exports = config;
