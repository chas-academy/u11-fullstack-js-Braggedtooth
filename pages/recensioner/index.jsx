import { LoadingOverlay, SegmentedControl, Stack, Title } from '@mantine/core'

import React, { useState } from 'react'
import Layout from '../../components/core/Layout'
import ReviewItem from '../../components/shared/ReviewItem'
import useReviews from '../../services/hooks/useReviews'

const Index = ({ user }) => {
  // const media = useMediaQuery('(min-width: 900px)')
  const [filter, setFilters] = useState(() => ' ')
  const { reviews, isLoading, userLoading, users } = useReviews()
  if (!reviews) {
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
      {
        !user ? reviews.map((review) => {
          return (
            <ReviewItem key={review.id} data={review}/>
          )
        }) : users.map((review) => {
          return (
            <ReviewItem key={review.id} data={review}/>
          )
        })
      }
    </Stack>

  )
}

export default Index
Index.getLayout = (page) => <Layout auth title="Reviews">{page}</Layout>
