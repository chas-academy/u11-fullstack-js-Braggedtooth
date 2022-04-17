import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchReviewByRealtorId } from '../queries/reviews'

const useReviewByRealtorsId = () => {
   const [realtorId, setRealtorId] = useState()
  const { data} = useQuery('getRealtorsReviews', () => fetchReviewByRealtorId(realtorId), {
    enabled: Boolean(realtorId),
    refetchInterval: false,
    refetchOnReconnect: true,
  })
  return{ 
  reviews: data?.data.data,
  fetchReviews: setRealtorId,
 
}
}

export default useReviewByRealtorsId
/* const fetchReview= (id)=> useQuery('getReview', () => fetchReviewById(id)) */