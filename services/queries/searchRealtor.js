import apiCall from '../lib/apiCall'

const searchRealtor = (query) => {
  const config = { type: 'get', path: '/realtor/search', params: { query: query } }
  return apiCall(config)
}

export default searchRealtor