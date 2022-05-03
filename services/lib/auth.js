import api from './api'

export const login = async (user) => {
  return api({ path: '/signin', type: 'post', body: user })
}

export const registerAcc = async (user) => {
  return api({ path: '/signup', type: 'post', body: user })
}

export const voidToken = () => {
  return api({ path: '/logout', type: 'delete' })
}

export const editProfile = (user) => {
  const config = { path: '/user/edit-profile', type: 'put', body: user }
  return api(config)
}
