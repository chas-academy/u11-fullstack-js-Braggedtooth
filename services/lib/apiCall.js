import axios from 'axios'
import { apiUrl } from './config'

const logOut = () => {
  const obj = { 'isLoggedIn': false, 'token': 'null', 'user': {} }
  sessionStorage.setItem('__LSM__', JSON.stringify(obj))

}
const apiCall = async ({ path, type, body, params }) => {

  const config = {
    url: apiUrl + path,
    method: type,
    body,
    params,
    withCredentials: true,
    headers: {
      //'Authorisation': 'Bearer' + token,
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  }
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      return response
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.status === 401) {
        logOut()
        window.location.replace('/login')
      }
      return Promise.reject(error)
    }
  )

  return axios(config)
}

export default apiCall
