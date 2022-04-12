import { useState } from 'react'
import { useQuery } from 'react-query'
import {  fetchReviewById } from '../queries/reviews'

const useReview = () => {
   const [queryId, setQueryId] = useState()
 const { data, isLoading, isError} = useQuery('getReview', () => fetchReviewById(queryId), {
    enabled: Boolean(queryId),
    refetchInterval: false,
    refetchOnReconnect: true,
  })
  return{ 
  review: data?.data.data,
  fetchReview: setQueryId,
  isError,
  isLoading 
}
}

export default useReview
/* const fetchReview= (id)=> useQuery('getReview', () => fetchReviewById(id)) */