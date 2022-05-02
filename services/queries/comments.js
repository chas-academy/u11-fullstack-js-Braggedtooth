import api from '../lib/apiCall'

export const createComment = (data) => {
  const config = { type: 'post', path: '/comments/create', body: data }
  return api(config)
}
export const deleteComment = (data) => {
  const config = { type: 'post', path: '/comments/delete', body: { id: data } }
  return api(config)
}
