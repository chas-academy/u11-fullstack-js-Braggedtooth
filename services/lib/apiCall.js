import axios from 'axios'
import { apiUrl } from './config'

const logOut = () => {
  const obj = { 'isLoggedIn': false, 'token': 'null', 'user': {} }
  sessionStorage.setItem('__LSM__', JSON.stringify(obj))

}
const getToken = ()=>{
  const store = sessionStorage.getItem('__LSM__')
  const token = JSON.parse(store).token
  return token || " "
}
const api = async ({ path, type, body, params }) => {
  const token = getToken()
  const config = {
    url: apiUrl + path,
    method: type,
    body,
    params,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  }
  return axios(config)
}

export default api
