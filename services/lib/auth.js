import axios from 'axios'
import { apiUrl } from './config'

export const login = async user => {
  return axios.post(apiUrl + '/signin', user, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  })
}

export const registerAcc = async user => {
  return axios.post(apiUrl + '/signup', user)
}

export const logOut = () => {
  return axios.delete(apiUrl + '/logout', { withCredentials: true })
}

export const editProfile = user => {
  return axios.put(apiUrl + '/user/edit-profile', user, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  })
}
