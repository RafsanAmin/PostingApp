const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pageExtensions: ['js'],
  distDir: 'build',
  pwa: {
    dest: 'public',
    swSrc: 'sw.js',
    dynamicStartUrl: true,
    dynamicStartUrlRedirect: '/App/Post',
  },
});
