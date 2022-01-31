module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/internal-api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};
