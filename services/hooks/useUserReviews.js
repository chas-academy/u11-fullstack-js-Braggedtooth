import { useQuery } from 'react-query'
import {  fetchUserReviews } from '../queries/reviews'

const useUserReviews = () => {
   const { data, isLoading,isError } = useQuery('getUserReviews', () => fetchUserReviews(), {
    refetchInterval: false,
  })
  return{ 
  userReviews: data?.data.data,
  isError,
  isLoading 
}
}

export default useUserReviews