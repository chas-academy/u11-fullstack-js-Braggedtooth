import { useState } from 'react'
import { useQuery } from 'react-query'
import {  fetchReviewById } from '../queries/reviews'

const useReview = () => {
  const [queryId, setQueryId] = useState()
  const [error, setErr] = useState()
  const { data, isLoading, isError } = useQuery(
    'getReview',
    () => fetchReviewById(queryId),
    {
      enabled: Boolean(queryId),
      refetchInterval: false,
      refetchOnReconnect: true,
      onError: (err) => {
        setErr(err)
        setQueryId(undefined)
      }
    }
  )
  return {
    review: data?.data.data,
    fetchReview: setQueryId,
    isError,
    error,
    isLoading
  }
}

export default useReview