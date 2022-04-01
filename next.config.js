const withImages = require('next-images')
module.exports = withImages()
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:3103'
  }
}
