import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useStore from './useStore'
import { fetchAllReviews } from '../queries/reviews'

const useReviews = (user) => {
  const [error, setError] = useState()
  const { logout } = useStore()
  useEffect(() => {
    if (error) {
      if (error.message === 'Request failed with status code 401') {
        logout()
      }
    }
  }, [error, logout])

  const { data, isLoading } = useQuery('getReviews', () => fetchAllReviews(), {
    enabled: Boolean(!user),
    retry: 3,
    onError: (err) => setError(err)
  })

  return {
    reviews: data?.data.data,
    isLoading
  }
}

export default useReviews