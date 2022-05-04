import { Avatar, Group, Text } from '@mantine/core'
import { Rating } from '@mui/material'
import React from 'react'

const AccordionLabel = ({ title, authorName, rating }) => {
  return (
    <Group noWrap>
      <Avatar radius="xl" size="lg" />
      <div>
        <Text>{title}</Text>
        <Group>
          <Text size="sm" color="dimmed" weight={400}>
            {authorName}
          </Text>
          <Rating value={rating} readOnly />
        </Group>
      </div>
    </Group>
  )
}
export default AccordionLabel
