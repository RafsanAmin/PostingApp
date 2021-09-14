const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pageExtensions: ['js'],
  distDir: 'build',
  ignoreDuringBuilds: true,
  pwa: {
    dest: 'public',
    sw: 'sw.js',
  },
});
