import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useStore from '../../services/hooks/useStore'
import { fetchAllReviews } from '../queries/reviews'

const useReviews = () => {
  const [error, setError] = useState()
  const { logout } = useStore()
  useEffect(() => {
    if (error) {
      if (error.message === 'Request failed with status code 401') {
        return logout()
      }

    }
  }, [error, logout])

  const { isLoggedIn } = useStore().store
  const { data, isLoading, } = useQuery('getReviews', () => fetchAllReviews(), {
    enabled: isLoggedIn,
    refetchInterval: false,
    onError: (err) => setError(err)
  })


  return {
    reviews: data?.data.data,
    isLoading,

  }
}

export default useReviews