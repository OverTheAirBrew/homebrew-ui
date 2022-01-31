const { i18n } = require('./next-i18next.config');

module.exports = {
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
