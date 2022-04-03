const withImages = require('next-images')

module.exports = {

  reactStrictMode: true,
  withImages,
  env: {
    API_URL: 'http://localhost:3103'
  },
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
