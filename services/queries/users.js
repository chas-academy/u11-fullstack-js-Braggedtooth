import apiCall from '../lib/apiCall'

export const getAllUsers = () => {
  const config = { type: 'get', path: '/admin/all-users' }
  return apiCall(config)
}

export const addUsers = (data) => {
  const config = { type: 'post', path: '/admin/add-user', body: data }
  return apiCall(config)
}

// can be refractored to one endpoint i.e changestatus(id, status)
export const activateUser = (id) => {
  const config = { type: 'put', path: '/admin/activate-user', body: { id } }
  return apiCall(config)
}
export const deleteUser = (id) => {
  const config = { type: 'put', path: '/admin/delete-user', body: { id } }
  return apiCall(config)
}
export const banUser = (id) => {
  const config = { type: 'put', path: '/admin/ban-user', body: { id } }
  return apiCall(config)
}
export const changeRole = (id) => {
  const config = { type: 'put', path: '/admin/change-role', body: { id } }
  return apiCall(config)
}
