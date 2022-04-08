import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useStore from '../../services/hooks/useStore'
import { fetchAllReviews, fetchReviewById, fetchUserReviews } from '../../services/queries/reviews'

const useReviews = () => {
  const [queryId, setQueryId] = useState()
  const [error, setError] = useState()
  const { logout } = useStore()
  useEffect(() => {
    if (error) {
      if (error.message === 'Request failed with status code 401') {
        return logout()
      }

    }
  }, [error])

  const { isLoggedIn } = useStore().store
  const { data, isLoading, } = useQuery('getReviews', () => fetchAllReviews(), {
    enabled: isLoggedIn,
    refetchInterval: false,
    onError: (err) => setError(err)
  })
  const { data: users, isLoading: userLoading, } = useQuery('getUserReviews', () => fetchUserReviews(), {
    enabled: isLoggedIn,
    refetchInterval: false,
    onError: (err) => setError(err)
  })
  const { data: singleReview, isLoading: reviewLoading, } = useQuery('getReview', () => fetchReviewById(queryId), {
    enabled: Boolean(queryId),
    refetchInterval: false,
    refetchOnReconnect: true,
    onError: (err) => setError({ err })
  })

  return {
    reviews: data?.data.data,
    isLoading,
    users: users?.data.data,
    userLoading,
    reviewLoading,
    review: singleReview?.data.data,
    fetchReview: setQueryId

  }
}

export default useReviews