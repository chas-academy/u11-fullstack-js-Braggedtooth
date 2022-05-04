import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotifications } from '@mantine/notifications'
import { Paper, Group, Text, ActionIcon } from '@mantine/core'
import { MdDelete } from 'react-icons/md'
import { deleteComment } from '../../services/queries/comments'
import useStore from '../../services/hooks/useStore'
import getTime from '../../services/lib/getTime'

const CommentItem = ({ comment }) => {
  const { user } = useStore().store
  const notifications = useNotifications()
  const queryClient = useQueryClient()
  const { id, content, authorName, createdAt, authorId } = comment
  const mutation = useMutation((data) => deleteComment(data), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getReview')
      notifications.showNotification({
        color: 'green',
        message: response.data.message
      })
    },
    onError: (e) => {
      console.log('submited review failed', e.response.data.error)
      notifications.showNotification({
        color: 'red',
        message: e.response.data.error
      })
    }
  })
  const doDeleteComment = () => {
    mutation.mutate(id)
  }
  return (
    <Paper key={id} p="sm" withBorder shadow="sm" m="sm">
      <Group position="apart">
        <Text>{content}</Text>
        <Group>
          <small>{authorName}</small>
          <small>{getTime(createdAt).date} </small>
          {user.id === authorId && (
            <ActionIcon onClick={doDeleteComment}>
              <MdDelete />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Paper>
  )
}

export default CommentItem
