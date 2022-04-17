import {
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/core/Layout'
import useReviewByRealtorsId from '../../services/hooks/useReviewByRealtorsId'

const ReviewbyRealtorId= () => {

  const router = useRouter()
  const [reviewState, setState] = useState(false)
  const {  id } = router.query
  const { reviews, fetchReviews } = useReviewByRealtorsId()
  const theme = useMantineTheme()
  useEffect(() => {
    if (reviews) {
      setState(reviews)
    }
  }, [reviews])

  useEffect(() => 
  { fetchReviews(id)}
  , [fetchReviews, id])
  return (
    <div> 
    Hello {id}
    </div>
  )
}



export default ReviewbyRealtorId
ReviewbyRealtorId.getLayout = (page) => <Layout auth title="Review">{page}</Layout>
