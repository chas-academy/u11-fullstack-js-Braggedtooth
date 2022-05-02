import { Stack, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import Layout from '../components/core/Layout'
import Image404 from '../assets/404.svg'

const Custom404 = () => {
  const theme = useMantineTheme()
  return (
    <Stack>
      <Image src={Image404} alt="404" color={theme.primaryColor} />
    </Stack>
  )
}

export default Custom404
Custom404.getLayout = (page) => (
  <Layout title="Not Found" auth={false}>
    {page}
  </Layout>
)
