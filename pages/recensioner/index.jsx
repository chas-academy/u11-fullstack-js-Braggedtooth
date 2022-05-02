import {
  Group,
  LoadingOverlay,
  SegmentedControl,
  Stack,
  Title
} from '@mantine/core'

import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/core/Layout'
import ReviewItem from '../../components/shared/ReviewItem'
import useReviews from '../../services/hooks/useReviews'
import useUserReviews from '../../services/hooks/useUserReviews'
import applyFilter from '../../services/lib/filter'

const Index = ({ user }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('title')
  const [filter, setFilters] = useState('')
  const [view, setView] = useState([])
  const [filteredView, setfilteredView] = useState([])
  const { reviews, isLoading } = useReviews(user)
  const { userReviews, isLoading: userLoading } = useUserReviews(user)
  const handleSort = (property) => {
    setOrderBy(property)
    setFilters(property)
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (user) {
      return setView(userReviews)
    }
    if (!user) {
      if (reviews) {
        return setView(reviews)
      }
    }
  }, [reviews, user, userReviews])
  const filtered = useCallback(() => {
    return applyFilter(view, order, orderBy)
  }, [order, orderBy, view])

  useEffect(() => {
    setfilteredView(filtered)

    return () => {
      setfilteredView(view)
    }
  }, [view, filtered])
  return (
    <Stack align="center">
      <LoadingOverlay visible={isLoading || userLoading} />
      <Title>Recensioner</Title>
      <Group>
        <SegmentedControl
          value={filter}
          onChange={(value) => handleSort(value)}
          data={[
            { label: 'Title', value: 'title' },
            { label: 'Betyg', value: 'rating' },
            { label: 'Datum', value: 'createdAt' },
            { label: 'Gillningar', value: 'likes' }
          ]}
        />
        <SegmentedControl
          value={order}
          onChange={setOrder}
          data={[
            { label: 'Ascending', value: 'asc' },
            { label: 'Descending', value: 'desc' }
          ]}
        />
      </Group>

      {user && view?.length === 0 && (
        <h1> Du har inte skrivit några recensioner ännu</h1>
      )}
      {filteredView?.map((review) => {
        return <ReviewItem key={review.id} data={review} />
      })}
    </Stack>
  )
}

export default Index
Index.getLayout = (page) => (
  <Layout auth title="Reviews">
    {page}
  </Layout>
)
