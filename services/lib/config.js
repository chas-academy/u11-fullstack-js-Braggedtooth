import axios from 'axios'
export const apiUrl = process.env.API_URL

if (!apiUrl) {
  console.log('No Api Url. Set API_URL  environment variable.')
}

export const fetcher = url =>
  axios
    .get(url, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': 'http://localhost:3103'
      }
    })
    .then(res => res.data.data)
