const withImages = require('next-images')

module.exports = {

  reactStrictMode: true,
  withImages,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
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
