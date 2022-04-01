import axios from 'axios'
import { apiUrl } from './config'

const apiCall = async ({ path, type, body, params }) => {
  const config = {
    url: apiUrl + path,
    method: type,
    data: body,
    params: params,
    withCredentials: true,
    headers: {
      //'Authorisation': 'Bearer' + token,
      'content-type': 'application/json',
      'access-control-allow-origin': apiUrl
    }
  }

  return axios(config)
}

export default apiCall
