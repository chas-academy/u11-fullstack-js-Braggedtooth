// id: "624920dd41d162c2e173c44c"
// title: "Hello"
// content: "213"
// published: true
// authorId: "6244d6498625a93555d4351d"
// rating: 5
// realtorsId: "6243a1856fc7a41b9441b86a"
// createdAt: "2022-04-03T04:21:49.058Z"
// updatedAt: "2022-04-05T22:11:57.444Z"

import { Group, Text } from '@mantine/core'
import { Rating } from '@mui/material'
import React from 'react'
import getTime from '../services/lib/getTime'

const ReviewItem = ({ title, authorId, rating, createdAt }) => {
  const date = getTime(createdAt).date
  return (
    <Group>
      <Text>{title}</Text>
      <Text>{authorId}</Text>
      <Rating value={rating} readOnly/>
      <Text>{date} </Text>

    </Group>

  )
}
export default ReviewItem