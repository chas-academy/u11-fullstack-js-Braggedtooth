import apiCall from '../lib/apiCall'

const searchRealtor = () => {
  const config = { type: 'get', path: '/reviews/all' }
  return apiCall(config)
}

export default searchRealtor