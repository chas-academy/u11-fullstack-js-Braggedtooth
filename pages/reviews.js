import { Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React from 'react'
import Layout from '../components/Layout'
import ReviewItem from '../components/ReviewItem'
import useReviews from '../services/hooks/useReviews'

const Reviews = ({ user }) => {
  const media = useMediaQuery('')
  const { reviews, isLoading, userLoading, users } = useReviews()
  if (!reviews) {
    return (
      <div>
        Vänligen logga in för att läsa resensioner
      </div>
    )
  }
  return !userLoading && !isLoading && (

    <Container p={'lg'} style={{ width: '100%', height: '100%' }}>
      {
        !user ? reviews.map((review) => {
          const { id, title, content, rating, createdAt } = review
          return (
            <ReviewItem key={id} title={title} createdAt={createdAt} rating={rating} authorId={content}/>
          )
        }) : users.map((review) => {
          const { id, title, content, rating, createdAt } = review
          return (
            <ReviewItem key={id} title={title} createdAt={createdAt} rating={rating} authorId={content}/>
          )
        })
      }
    </Container>

  )
}

export default Reviews
Reviews.getLayout = (page) => <Layout title="Reviews">{page}</Layout>
