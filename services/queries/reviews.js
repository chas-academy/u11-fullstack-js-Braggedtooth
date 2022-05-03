import api from '../lib/api'

export const fetchUserReviews = () => {
  const config = { type: 'get', path: '/user/my-reviews' }
  return api(config)
}
export const fetchAllReviews = () => {
  const config = { type: 'get', path: '/reviews/all' }
  return api(config)
}
export const fetchReviewById = (id) => {
  const config = { type: 'get', path: '/reviews/review', params: { id } }
  return api(config)
}

export const fetchReviewByRealtorId = (id) => {
  const config = {
    type: 'get',
    path: '/reviews/realtor',
    params: { realtorId: id }
  }
  return api(config)
}
