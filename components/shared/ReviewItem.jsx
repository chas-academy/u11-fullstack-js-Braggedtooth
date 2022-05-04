import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { Rating } from '@mui/material'
import React from 'react'
import { MdUnpublished, MdPublish, MdDelete } from 'react-icons/md'
import { useMutation, useQueryClient } from 'react-query'
import useStore from '../../services/hooks/useStore'
import getTime from '../../services/lib/getTime'
import { togglePublish, deleteReview } from '../../services/queries/reviews'

const ReviewItem = ({ data }) => {
  const media = useMediaQuery('(min-width: 900px)')
  const {
    title,
    authorName,
    rating,
    createdAt,
    id,
    comments,
    authorId,
    published
  } = data
  const { date } = getTime(createdAt)
  const { user } = useStore().store
  const notifications = useNotifications()
  const queryClient = useQueryClient()
  const theme = useMantineTheme()

  const mutatation = useMutation((reviewId) => togglePublish(reviewId), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getUserReviews')
      notifications.showNotification({
        color: 'green',
        message: response.data.message
      })
    },
    onError: (e) => {
      notifications.showNotification({
        color: 'red',
        message: e.response.data.error
      })
    }
  })

  const delMutation = useMutation((reviewId) => deleteReview(reviewId), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getUserReviews')
      notifications.showNotification({
        color: 'green',
        message: response.data.message
      })
    },
    onError: (e) => {
      notifications.showNotification({
        color: 'red',
        message: e.response.data.error
      })
    }
  })

  const togglePub = () => {
    mutatation.mutate(id)
  }
  const delComment = () => {
    delMutation.mutate(id)
  }
  return (
    <Group position="apart" style={{ width: '100%' }}>
      <Card
        component="a"
        href={`/recensioner/${id}`}
        styles={() => ({
          root: {
            '&:hover': { backgroundColor: theme.colors.blue[6] },
            border: 0,
            width: media ? '680px' : '100%',
            padding: '2em'
          }
        })}
      >
        <Card.Section p="xs">
          <Group position="apart">
            <Text weight={700} size="lg" lineClamp={1}>
              {title.toUpperCase()}
            </Text>
            <Rating
              value={rating}
              readOnly
              sx={{ color: theme.primaryColor }}
            />
          </Group>
        </Card.Section>
        <Card.Section p="sm">
          <Group position="apart">
            <Text
              color={
                user.id === authorId ? theme.colors.cyan : theme.colors.dark
              }
            >
              Skriven av {(user.id === authorId && 'Dig') || authorName}
            </Text>
            <Text color={theme.colors.dark}> {date}</Text>
            {comments && (
              <Badge color={theme.colors.orange}>
                {comments.length}
                {comments.length === 1 ? ' kommentar' : ' kommentarer'}
              </Badge>
            )}
          </Group>
        </Card.Section>
      </Card>
      {user.id === authorId && comments && (
        <Paper style={{ width: !media && '100%' }}>
          <Group p="sm" position="right">
            <Tooltip
              label={published ? 'Avpublicera' : 'Publicera'}
              position="bottom"
              withArrow
            >
              <ActionIcon
                onClick={togglePub}
                variant="filled"
                color={theme.primaryColor}
              >
                {published ? (
                  <MdUnpublished size={24} />
                ) : (
                  <MdPublish size={24} />
                )}
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Radera" position="bottom" withArrow>
              <ActionIcon onClick={delComment} color="red" variant="filled">
                <MdDelete size={24} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Paper>
      )}
    </Group>
  )
}
export default ReviewItem
