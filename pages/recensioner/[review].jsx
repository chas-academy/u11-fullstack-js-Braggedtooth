import {
  Badge,
  Blockquote,
  Button,
  Card,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  Box,
  useMantineTheme,
  Container
} from '@mantine/core'
import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/core/Layout'
import NewComment from '../../components/forms/NewComment'
import CommentItem from '../../components/shared/CommentItem'
import useReview from '../../services/hooks/useReview'
import getTime from '../../services/lib/getTime'

const Review = () => {
  const router = useRouter()
  const [reviewState, setState] = useState(false)
  const { review: id } = router.query
  const { fetchReview, review, error } = useReview()
  const theme = useMantineTheme()
  useEffect(() => {
    if (review) {
      setState(review)
    }
  }, [review])

  useEffect(() => {
    fetchReview(id)
  }, [id, fetchReview])

  return reviewState ? (
    <Container size="100%" style={{ minWidth: '60%' }}>
      <Stack style={{ width: '100%' }}>
        <>
          <Group justify="apart" style={{ width: '90%' }}>
            <Button color="cyan" onClick={() => router.back()}>
              Tillbaka
            </Button>
            <Title align="center" order={3} style={{ margin: ' 0 auto' }}>
              {reviewState.title}
            </Title>
          </Group>
          <Blockquote
            cite={` - ${reviewState.authorName} ${
              getTime(reviewState.createdAt).date
            }`}
          >
            <Text
              style={{ overflowWrap: 'break-word', wordWrap: ' break-word' }}
            >
              {reviewState.content}
            </Text>{' '}
          </Blockquote>

          <Stack align="end">
            <Rating
              value={reviewState.rating}
              readOnly
              sx={{ color: theme.colors.blue }}
            />

            <Group>
              <Badge size="lg" variant="filled" color="cyan">
                {reviewState.comments.length} Kommentarer
              </Badge>
            </Group>
          </Stack>
        </>
        <Group>
          <Paper withBorder shadow="sm" p="md" style={{ width: '100%' }}>
            <Text>Kommentarer</Text>
            {reviewState.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            <NewComment id={id} />
          </Paper>
        </Group>
      </Stack>
    </Container>
  ) : (
    <>
      <Loader />
      {error && (
        <>
          <Text>{error.response.data.error}</Text>
          <Button onClick={() => router.back()}> Back</Button>
        </>
      )}
    </>
  )
}

export default Review
Review.getLayout = (page) => <Layout auth title="Review">{page}</Layout>
