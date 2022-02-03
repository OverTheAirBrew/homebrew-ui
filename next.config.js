const { i18n } = require('./next-i18next.config');

const withTM = require('next-transpile-modules')(['react-hook-mousetrap']);

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/brewing',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/internal-api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  i18n,
};
