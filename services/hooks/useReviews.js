import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useStore from './useStore'
import { fetchAllReviews } from '../queries/reviews'

const useReviews = () => {
  const [error, setError] = useState()
  const { logout } = useStore()
  useEffect(() => {
    if (error) {
      if (error.message === 'Request failed with status code 401') {
        logout()
      }
    }
  }, [error, logout])

  const { isLoggedIn } = useStore().store
  const { data, isLoading } = useQuery('getReviews', () => fetchAllReviews(), {
    enabled: isLoggedIn,
    refetchInterval: false,
    onError: (err) => setError(err)
  })

  return {
    reviews: data?.data.data,
    isLoading
  }
}

export default useReviews