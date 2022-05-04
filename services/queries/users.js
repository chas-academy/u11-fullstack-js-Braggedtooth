import api from '../lib/api'

export const getAllUsers = () => {
  const config = { type: 'get', path: '/admin/all-users' }
  return api(config)
}

export const addUsers = (data) => {
  const config = { type: 'post', path: '/admin/add-user', body: data }
  return api(config)
}

// can be refractored to one endpoint i.e changestatus(id, status)
export const activateUser = (id) => {
  const config = { type: 'put', path: '/admin/activate-user', body: { id } }
  return api(config)
}
export const deleteUser = (id) => {
  const config = { type: 'put', path: '/admin/delete-user', body: { id } }
  return api(config)
}
export const banUser = (id) => {
  const config = { type: 'put', path: '/admin/ban-user', body: { id } }
  return api(config)
}
export const changeRole = (id) => {
  const config = { type: 'put', path: '/admin/change-role', body: { id } }
  return api(config)
}
