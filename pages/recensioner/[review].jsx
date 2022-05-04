import {
  Badge,
  Blockquote,
  Button,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
  Container
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Rating } from '@mui/material'
import capitalize from 'lodash/capitalize'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'
import Layout from '../../components/core/Layout'
import NewComment from '../../components/forms/NewComment'
import CommentItem from '../../components/shared/CommentItem'
import useReview from '../../services/hooks/useReview'
import getTime from '../../services/lib/getTime'

const Review = () => {
  const media = useMediaQuery('(min-width: 900px)')
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
    <Container size="100%" pl={0} pr={0}>
      <Stack style={{ width: '100%' }}>
        <>
          <Group position="apart">
            <Button color="cyan" onClick={() => router.back()}>
              Tillbaka
            </Button>
            <Rating
              value={reviewState.rating}
              readOnly
              sx={{ color: theme.colors.blue }}
            />
          </Group>
          <Title align="center" order={3}>
            {capitalize(reviewState.title)}
          </Title>
          <Blockquote
            cite={` - ${reviewState.authorName} ${
              getTime(reviewState.createdAt).date
            }`}
          >
            <Text
              style={{ overflowWrap: 'break-word', wordWrap: ' break-word' }}
            >
              {reviewState.content}
            </Text>
          </Blockquote>

          <Stack align="end">
            <Badge size="lg" variant="filled" color="cyan">
              {reviewState.comments.length} Kommentarer
            </Badge>
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
