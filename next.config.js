const withImages = require('next-images')

module.exports = {

  reactStrictMode: true,
  withImages,
  async redirects () {
    return [
      {
        source: '/register',
        destination: '/login',
        permanent: true
      }
    ]
  }
}
