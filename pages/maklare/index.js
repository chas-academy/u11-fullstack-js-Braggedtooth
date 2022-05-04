import {
  Group,
  Stack,
  Accordion,
  Text,
  Avatar,
  Card,
  Box,
  Anchor,
  Loader
} from '@mantine/core'
import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import Layout from '../../components/core/Layout'
import useReviewByRealtorsId from '../../services/hooks/useReviewByRealtorsId'

function AccordionLabel({ title, authorName, rating }) {
  return (
    <Group noWrap>
      <Avatar radius="xl" size="lg" />
      <div>
        <Text>{title}</Text>
        <Group>
          <Text size="sm" color="dimmed" weight={400}>
            {authorName}
          </Text>
          <Rating value={rating} readOnly />{' '}
        </Group>
      </div>
    </Group>
  )
}
const ReviewbyRealtorId = () => {
  const router = useRouter()
  const { id } = router.query
  const { reviews, realtor, fetchReviews, isLoading } = useReviewByRealtorsId()

  useEffect(() => {
    if (id) {
      const decodeId = atob(id)
      fetchReviews(decodeId)
    }
  }, [fetchReviews, id])

  const items = reviews?.map((item) => (
    <Accordion.Item label={<AccordionLabel {...item} />} key={item.id}>
      <Text size="sm" lineClamp={2}>
        {item.content}
      </Text>
      <Anchor href={`/recensioner/${item.id}`}>Läs mer..</Anchor>
    </Accordion.Item>
  ))
  return !isLoading ? (
    <>
      <Card
        p="md"
        m="sm"
        style={{ maxHeight: '100%', textAlign: 'center', width: '100%' }}
      >
        <Group align="center" position="center">
          <Text>
            {realtor?.firstname} {realtor?.lastname}
          </Text>
        </Group>

        <Text color="gray">{realtor?.companyName || realtor?.faction}</Text>
        <Text color="gray">{realtor?.registrationdate}</Text>
        <Box>
          <Rating value={realtor?.averageRating} readOnly />
        </Box>
        <Anchor href={`/recensioner/skriv?id=${realtor?.id}`}>
          Skriv Recension
        </Anchor>
      </Card>

      <Stack position="center" style={{ width: '100%' }} align="center">
        {!isEmpty(reviews) ? (
          <Accordion
            initialItem={-1}
            iconPosition="right"
            style={{ width: '100%' }}
          >
            {items}
          </Accordion>
        ) : (
          <Text> Det finns inga recensioner</Text>
        )}
      </Stack>
    </>
  ) : (
    <Loader />
  )
}

export default ReviewbyRealtorId
ReviewbyRealtorId.getLayout = (page) => (
  <Layout auth title="Review">
    {page}
  </Layout>
)
