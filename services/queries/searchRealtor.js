import api from '../lib/api'

const searchRealtor = (query) => {
  const config = { type: 'get', path: '/r/search', params: { query } }
  return api(config)
}

export default searchRealtor
