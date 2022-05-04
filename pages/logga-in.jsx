import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@mantine/core'
import Layout from '../components/core/Layout'
import useStore from '../services/hooks/useStore'
import Routes from '../services/routes'

const LoginForm = dynamic(() => import('../components/forms/Login'))
const Login = () => {
  const { isLoggedIn } = useStore().store
  const { profile } = Routes()
  useEffect(() => {
    if (isLoggedIn) {
      profile()
    }
  }, [isLoggedIn, profile])
  return (
    !isLoggedIn && (
      <Container style={{ width: '100%' }}>
        <LoginForm />
      </Container>
    )
  )
}

export default Login

Login.getLayout = (page) => (
  <Layout title="Login" auth={false}>
    {page}
  </Layout>
)
