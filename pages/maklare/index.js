import {
  Group,
  Stack,
  Accordion,
  Text,
  Card,
  Box,
  Anchor,
  Loader
} from '@mantine/core'
import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import dynamic from 'next/dynamic'
import Layout from '../../components/core/Layout'
import useReviewByRealtorsId from '../../services/hooks/useReviewByRealtorsId'

const AccordionItem = dynamic(() =>
  import('../../components/shared/AccordionItem')
)

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
            {AccordionItem}
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
