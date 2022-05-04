import api from '../lib/api'

export const fetchUserReviews = () => {
  return api({ type: 'get', path: '/user/my-reviews' })
}
export const fetchAllReviews = () => {
  return api({ type: 'get', path: '/reviews/all' })
}
export const fetchReviewById = (id) => {
  return api({ type: 'get', path: '/reviews/review', params: { id } })
}
export const fetchReviewByRealtorId = (id) => {
  return api({
    type: 'get',
    path: '/reviews/realtor',
    params: { realtorId: id }
  })
}
export const createReview = (data) => {
  return api({ type: 'post', path: '/reviews/create', body: data })
}
export const togglePublish = (id) => {
  return api({ type: 'put', path: '/reviews/publish', body: { id } })
}
export const deleteReview = (id) => {
  return api({ type: 'delete', path: '/reviews/delete', body: { id } })
}
