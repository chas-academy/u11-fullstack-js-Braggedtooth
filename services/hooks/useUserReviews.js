import { useQuery } from 'react-query'
import {  fetchUserReviews } from '../queries/reviews'

const useUserReviews = (user) => {
  const { data, isLoading, isError } = useQuery(
    'getUserReviews',
    () => fetchUserReviews(),
    {
      enabled: Boolean(user),
      refetchInterval: false
    }
  )
  return {
    userReviews: data?.data.data,
    isError,
    isLoading
  }
}

export default useUserReviews