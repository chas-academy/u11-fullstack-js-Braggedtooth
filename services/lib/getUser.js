import axios from 'axios'
import { apiUrl } from './config'

const getUser = () => {
  return axios
    .get(apiUrl + '/user/me', {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': apiUrl
      }
    })
    .then(res => res.data.data)
}

export default getUser
