import { Paper, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/core/Layout'
import ReviewForm from '../../components/forms/NewReview'

const NewReview = () => {
  const router = useRouter()
  console.log(router)
  return (
    <>
      <Title> Skriv en Rescension</Title>
      <Paper p="lg">
        <ReviewForm />
      </Paper>{' '}
    </>
  )
}

export default NewReview

NewReview.getLayout = (page) => (
  <Layout title="Ny recension" auth={false}>
    {page}
  </Layout>
)
