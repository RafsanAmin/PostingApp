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
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'development',
        },
      });
module.exports = config;
