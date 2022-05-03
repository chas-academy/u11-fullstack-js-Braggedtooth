import { useQuery } from 'react-query'
import api from '../lib/api'

function verifyEmail(token) {
  return api({ path: '/verify-account', type: 'get', params: { token } })
}
function useVerify(token) {
  return useQuery('verify', () => verifyEmail(token), {
    retry: false,
    refetchInterval: 0,
    refetchOnMount: false,
    refetchIntervalInBackground: 0,
    retryOnMount: 0,
    refetchOnWindowFocus: false,
    enabled: !!token
  })
}

export default useVerify
