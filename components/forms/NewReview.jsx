import { useState, useEffect } from 'react'
import { useForm } from '@mantine/hooks'
import { useRouter } from 'next/router'
import {
  TextInput,
  Button,
  Group,
  Text,
  Textarea,
  Paper,
  Stack
} from '@mantine/core'
import { Rating } from '@mui/material'
import { useNotifications } from '@mantine/notifications'
import { useMutation } from 'react-query'
import { createReview } from '../../services/queries/reviews'

const ReviewForm = ({ id }) => {
  const [charCount, setCharCount] = useState(0)
  const notifications = useNotifications()
  const router = useRouter()
  const submitReview = useMutation((data) => createReview(data), {
    onSuccess: (response) => {
      notifications.showNotification({
        color: 'green',
        message: response.data.message
      })
      router.push(`/recensioner/${response.data.data.id}`)
    },
    onError: (e) => {
      console.log('submited review failed', e.response.data.error)
      notifications.showNotification({
        color: 'red',
        message: e.response.data.error
      })
    }
  })
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      rating: '1'
    },
    errorMessages: {
      title: 'Vänligen ange ett giltigt mailadress',
      content: 'Måste vara längre än 200 '
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
      rating: parseInt(data.rating, 10),
      realtorsId: id
    }
    submitReview.mutate(dataToSend)
  }
  useEffect(() => {
    setCharCount(form.values.content.length)
  }, [form.values.content, charCount])

  return (
    <Paper p="lg" style={{ width: '100%' }}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="Titel"
          label="Titel"
          required
          size="lg"
          mb="md"
          {...form.getInputProps('title')}
        />
        <Stack>
          <Textarea
            placeholder="Din rescension"
            label="Din rescension - Minst 500 ord"
            minRows={4}
            autosize
            size="lg"
            maxLength={2000}
            required
            {...form.getInputProps('content')}
          />
          <Group position="right" align="center">
            <Text color={charCount > 500 ? 'green' : 'red'}>{charCount}</Text>
            <span>/ 2000 ord</span>
          </Group>
        </Stack>
        <Group p="lg" position="apart">
          <Stack>
            <Rating name="Betyg" {...form.getInputProps('rating')} />
            <Text>Ditt Betyg : {form.values.rating}</Text>
          </Stack>
          <Button type="submit" style={{ alignSelf: 'flex-end' }}>
            Skicka
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
export default ReviewForm
