import React from 'react'
import dynamic from 'next/dynamic'
import { Container, Title, Loader, Center } from '@mantine/core'
import { useRouter } from 'next/router'
import Layout from '../../components/core/Layout'

const ReviewForm = dynamic(() => import('../../components/forms/NewReview'))

const NewReview = () => {
  const router = useRouter()
  const { id } = router.query

  return id ? (
    <>
      <Title> Skriv en Rescension</Title>
      <Container size="lg" style={{ width: '100%' }}>
        <ReviewForm id={id} />
      </Container>
    </>
  ) : (
    <Center>
      <Loader />
    </Center>
  )
}

export default NewReview

NewReview.getLayout = (page) => (
  <Layout title="Ny recension" auth={false}>
    {page}
  </Layout>
)
