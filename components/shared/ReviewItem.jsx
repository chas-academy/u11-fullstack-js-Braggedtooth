// id: "624920dd41d162c2e173c44c"
// title: "Hello"
// content: "213"
// published: true
// authorId: "6244d6498625a93555d4351d"
// rating: 5
// realtorsId: "6243a1856fc7a41b9441b86a"
// createdAt: "2022-04-03T04:21:49.058Z"
// updatedAt: "2022-04-05T22:11:57.444Z"

import { Badge, Card, Group, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Rating } from '@mui/material'
import React from 'react'
import getTime from '../../services/lib/getTime'

const ReviewItem = ({ data }) => {
  const { title, authorName, rating, createdAt, id, likes, comments } = data
  const media = useMediaQuery('(min-width: 900px)')
  const date = getTime(createdAt).date
  const theme = useMantineTheme()

  return (

    <Card component={'a'}
          href={`/recensioner/${id}`}
          styles={(theme) => ({
            root: {
              '&:hover': { backgroundColor: theme.colors.gray },
              border: 0,
              width: media ? '680px' : '100%',
              padding: '2em'
            }
          })
          }>
      <Card.Section p={3}>
        <Group position="apart">
          <Text weight={700} size="md" lineClamp={1}>{title}</Text>
          <Rating
            value={rating} readOnly
            sx={{ color: theme.colors.blue }}/>
        </Group>
      </Card.Section>
      <Card.Section p={3}>
        <Group position={'apart'}>
          <Text color="gray"> Skriven av {authorName}</Text>
          <Text color="gray"> {date}</Text>
          {comments &&
            <Text color="gray"> Kommentarer <Badge size="sm" variant="outline" color="orange">{comments.length}</Badge></Text>}
          <Text color="gray">Gillningar <Badge size="sm" variant="filled" color="cyan">{likes}</Badge></Text>
        </Group>
      </Card.Section>
    </Card>

  )
}
export default ReviewItem