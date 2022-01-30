import axios from 'axios'
import { apiUrl } from './config'

export const login = async user => {
  const auth = axios.post(apiUrl + '/signin', user, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  })
  return auth
}

export const registerAcc = async user => {
  const auth = axios.post(apiUrl + '/signup', user)
  return auth
}

export const logout = () => {
  return axios.delete(apiUrl + 'logout', { withCredentials: true })
}
