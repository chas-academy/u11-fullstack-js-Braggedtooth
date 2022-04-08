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
import useReviews from '../../services/hooks/useReviews'

const Review = ({}) => {

  const router = useRouter()
  const [reviewState, setState] = useState(false)
  const { review: id } = router.query
  const { fetchReview, review } = useReviews()
  const theme = useMantineTheme()
  useEffect(() => {
    if (review) {
      setState(review)
    }
  }, [review])

  useEffect(() => {
    fetchReview(id)
  }, [id, fetchReview])
  return reviewState && (
    <Stack sx={() => ({ root: { minWidth: '60%', height: '50%' } })}>
      <LoadingOverlay visible={!reviewState}/>
      <Paper p={'lg'}>
        <Title align="center" order={3}>{reviewState.title}</Title>
        <Text align="center" p="lg">
          {reviewState.content}
        </Text>
        <Group align={'end'} position={'apart'}>
          <Group position={'center'}>
            <Text size="md">Skriven av: {reviewState.authorName}</Text>
            <Rating
              value={reviewState.rating} readOnly
              sx={{ color: theme.colors.blue }}/>
          </Group>
          <Group>
            <Tooltip label="Klicka för att gilla">
              <Badge size="lg" variant="filled" color="cyan">{reviewState.likes}</Badge>
            </Tooltip>
          </Group>
        </Group>
      </Paper>
      <Button color="blue" mt="sm" onClick={() => router.back()} style={{ alignSelf: 'end' }}>Tillbaka</Button>
    </Stack>

  )
}

export default Review
Review.getLayout = (page) => <Layout auth title="Review">{page}</Layout>
