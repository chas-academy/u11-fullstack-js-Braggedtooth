import { Container } from '@mantine/core'
import React, { useEffect } from 'react'
import Layout from '../components/core/Layout'
import LoginForm from '../components/forms/Login'
import useStore from '../services/hooks/useStore'
import Routes from '../services/routes'

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
      <Container>
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
