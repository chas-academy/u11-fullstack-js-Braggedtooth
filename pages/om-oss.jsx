import { Text } from '@mantine/core'
import React from 'react'
import Layout from '../components/core/Layout'

const About = () => {
  return (
    <>
      <h1>Om MV</h1>
      <Text>Kommer snart...</Text>
    </>
  )
}

export default About
About.getLayout = page => (
  <Layout title="About Us" auth={false}>
    {page}
  </Layout>
)
