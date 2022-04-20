import {
  Center,
  Group,
  Pagination,
  Paper,
  Text,
  useMantineTheme
} from '@mantine/core'
import Rating from '@mui/material/Rating'
import isArray from 'lodash/isArray'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import range from '../../services/lib/range'
import chunk from './../../services/lib/chunk'

const Results = ({ data }) => {
  const [activePage, setPage] = useState(1)
  const [toMap, setMap] = useState(false)
  const theme = useMantineTheme()
  useEffect(() => {
    if (isArray(data)) {
      setMap(true)
    }
  }, [data])
  const router = useRouter()

  const res = chunk(data, 10)
  if (data?.message) {
    return <p>Vi hittade ingen mäklare med namnet du angav..</p>
  }
  const ShowModal = (item) => {
    const encodeId = btoa(item.id)
    router.push({
      pathname: '/maklare',
      query: { id: encodeId }
    })
  }

  return toMap ? (
    <>
      {res[activePage - 1].map((item) => (
        <Paper
          shadow="sm"
          radius="xs"
          p="sm"
          key={item.id}
          my={5}
          sx={{
            '&:hover': {
              cursor: 'pointer',
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.dark[3]
            }
          }}
          onClick={() => ShowModal(item)}
        >
          <Group position="apart">
            <Text weight={600}>
              {item.firstname} {item.lastname}
            </Text>
            <Rating
              value={range(item.averageRating)}
              readOnly
              precision={0.5}
            />
          </Group>
        </Paper>
      ))}

      <Center my={2}>
        <Pagination
          total={res.length}
          color="blue"
          size="sm"
          page={activePage}
          onChange={setPage}
        />
      </Center>
    </>
  ) : (
    <div />
  )
}
export default Results
