import { useState, useEffect } from 'react'
import { useForm } from '@mantine/hooks'
import { Button, Group, Text, Textarea, Box, Stack } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from 'react-query'
import { createComment } from '../../services/queries/comments'

const NewComment = ({ id }) => {
  const [charCount, setCharCount] = useState(0)
  const notifications = useNotifications()
  const queryClient = useQueryClient()
  const form = useForm({
    initialValues: {
      content: ''
    }
  })
  const submitComment = useMutation((data) => createComment(data), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getReview')
      form.reset()
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

  const onSubmit = (data) => {
    if (!id) {
      notifications.showNotification({
        color: 'green',
        message: 'Välj en Mäklare från sök listan för att skriva en rescension'
      })
    }
    const dataToSend = {
      ...data,
      reviewId: id
    }
    submitComment.mutate(dataToSend)
  }
  useEffect(() => {
    setCharCount(form.values.content.length)
  }, [form.values.content, charCount])

  return (
    <Box p="sm">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <Textarea
            placeholder="Lämna en kommentar"
            label="Lämna en kommentar"
            minRows={2}
            autosize
            size="lg"
            maxLength={200}
            required
            {...form.getInputProps('content')}
          />
          <Group position="right" align="center">
            <Group>
              <Text color={charCount > 199 ? 'red' : 'green'}>{charCount}</Text>
              <span>/ 200 ord</span>
            </Group>
            <Button type="submit" style={{ alignSelf: 'flex-end' }}>
              Skicka
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}
export default NewComment
