import { Grid, Paper, Text } from '@mantine/core'
import React from 'react'
import SearchReviews from '../components/core/SearchReviews'
import Layout from '../components/Layout'

const Reviews = () => {
  return (
    <Grid columns={24} justify="space-between" style={{ width: '100%', height: '100%' }}>
      <Grid.Col span={6}>
        <SearchReviews/>
      </Grid.Col>
      <Grid.Col span={18}>
        <Paper p={'lg'} style={{ width: '100%', height: '100%' }}>
          <Text weight={600} size={'lg'}>
            Hello
          </Text>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

export default Reviews
Reviews.getLayout = (page) => <Layout title="Reviews">{page}</Layout>
