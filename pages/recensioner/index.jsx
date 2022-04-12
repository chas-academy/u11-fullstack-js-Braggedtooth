import { LoadingOverlay, SegmentedControl, Stack, Text, Title } from '@mantine/core'

import React, { useState } from 'react'
import Layout from '../../components/core/Layout'
import ReviewItem from '../../components/shared/ReviewItem'
import useReviews from '../../services/hooks/useReviews'
import useUserReviews from '../../services/hooks/useUserReviews'

const Index = ({ user }) => {
  // const media = useMediaQuery('(min-width: 900px)')
  const [filter, setFilters] = useState(() => ' ')
  const { reviews, isLoading } = useReviews()
  const { userReviews, isLoading:userLoading }= useUserReviews()

  if (!reviews ||!userReviews) {
    return (
      <LoadingOverlay visible/>
    )
  }

  return !userLoading && !isLoading && (
    <Stack align={'center'}>
      <Title>
        Recensioner
      </Title>
      <SegmentedControl
        value={filter}
        onChange={setFilters}
        data={[
          { label: 'Standard', value: 'latest' },
          { label: 'Betyg', value: 'star' },
          { label: 'Datum', value: 'date' },
          { label: 'Gillningar', value: 'likes' },
        ]}
      />
      { user && userReviews.length === 0 && <h1> Du har inte skrivit några recensioner ännu</h1>}
      {
        !user ? reviews.map((review) => {
          return (
            <ReviewItem key={review.id} data={review}/>
          )
        }) : userReviews.map((userReview) => {
        
          return (
            <ReviewItem key={userReview.id} data={userReview}/>
          )
        })
      }
    </Stack>

  )
}

export default Index
Index.getLayout = (page) => <Layout auth title="Reviews">{page}</Layout>
