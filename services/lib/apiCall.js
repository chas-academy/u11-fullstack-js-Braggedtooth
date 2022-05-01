import axios from 'axios'
import { apiUrl } from './config'


const getToken = () => {
  const store = sessionStorage.getItem('__LSM__')
  if (store) {
    return JSON.parse(store).token
  }
  return ''
}
const api = async ({ path, type, body, params }) => {
  const token = getToken()
  const config = {
    url: apiUrl + path,
    method: type,
    data: body,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  }

  return axios(config)
}

export default api
