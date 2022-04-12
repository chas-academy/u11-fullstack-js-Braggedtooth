import apiCall from '../lib/apiCall'
export const fetchUserReviews = () => {
  const config = { type: 'get', path: '/user/my-reviews' }
  return apiCall(config)
}
export const fetchAllReviews = () => {
  const config = { type: 'get', path: '/reviews/all' }
  return apiCall(config)
}
export const fetchReviewById = (id) => {
  const config = { type: 'get', path: '/reviews/review', params: { id: id } }
  return apiCall(config)
}
