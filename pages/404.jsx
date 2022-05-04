import { Button, Stack, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/core/Layout'
import Image404 from '../assets/404.svg'

const Custom404 = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  return (
    <Stack>
      <Image
        src={Image404}
        alt="404"
        width={500}
        height={500}
        color={theme.primaryColor}
      />
      <Button onClick={() => router.back()}>Back</Button>
    </Stack>
  )
}

export default Custom404
Custom404.getLayout = (page) => (
  <Layout title="Not Found" auth={false}>
    {page}
  </Layout>
)
