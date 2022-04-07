import apiCall from '../lib/apiCall'

const getUserReviews = () => {
  const config = { type: 'get', path: '/user/my-reviews' }
  return apiCall(config)
}

export default getUserReviews