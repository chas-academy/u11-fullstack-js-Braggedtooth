import Search from '../components/core/search'
import React from 'react'
import Layout from '../components/Layout'

const Reviews = () => {
  return <Search />
}

export default Reviews
Reviews.getLayout = (page) => <Layout title='Reviews'>{page}</Layout>
