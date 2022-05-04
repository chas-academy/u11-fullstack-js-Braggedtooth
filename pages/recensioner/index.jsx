import {
  Center,
  Group,
  Loader,
  SegmentedControl,
  Stack,
  Title
} from '@mantine/core'
import dynamic from 'next/dynamic'

import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/core/Layout'

import useReviews from '../../services/hooks/useReviews'
import useUserReviews from '../../services/hooks/useUserReviews'
import applyFilter from '../../services/lib/filter'

const ReviewItem = dynamic(() => import('../../components/shared/ReviewItem'))

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
  return !isLoading || !userLoading ? (
    <Stack align="center">
      <Title>Recensioner</Title>
      <Group position="center">
        <SegmentedControl
          value={filter}
          onChange={(value) => handleSort(value)}
          data={[
            { label: 'Title', value: 'title' },
            { label: 'Betyg', value: 'rating' },
            { label: 'Datum', value: 'createdAt' },
            { label: 'Antal Kommentarer', value: 'comments' }
          ]}
        />
        <SegmentedControl
          value={order}
          onChange={setOrder}
          data={[
            { label: 'Stigande', value: 'asc' },
            { label: 'Fallande', value: 'desc' }
          ]}
        />
      </Group>

      {user && view?.length === 0 && (
        <h1> Du har inte skrivit några recensioner ännu</h1>
      )}
      {filteredView?.map((review) => {
        return (
          <ReviewItem
            key={review.id}
            data={review}
            published={review.published}
          />
        )
      })}
    </Stack>
  ) : (
    <Center>
      <Loader />
    </Center>
  )
}

export default Index
Index.getLayout = (page) => (
  <Layout auth title="Reviews">
    {page}
  </Layout>
)
