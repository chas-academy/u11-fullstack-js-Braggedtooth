const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins([[withBundleAnalyzer], withImages, withPWA], {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/login',
        permanent: true
      }
    ]
  }
})