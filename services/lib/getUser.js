import axios from 'axios'
import { apiUrl } from './config'

const getUser = () => {
  const data = axios
    .get(apiUrl + '/user/me', {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': apiUrl
      }
    })
    .then(res => res.data.data)
  return data
}

export default getUser
