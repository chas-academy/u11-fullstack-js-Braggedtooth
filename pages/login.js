import React, { useEffect } from 'react'
import Container from '../components/core/Container'
import LoginForm from '../components/forms/Login'
import Layout from '../components/Layout'
import useStore from '../services/hooks/useStore'
import Routes from '../services/routes'

const Login = () => {
  const { isLoggedIn } = useStore().store
  const { profile } = Routes()
  useEffect(() => {
    if (isLoggedIn) {
      profile()
    }
  }, [isLoggedIn])
  return !isLoggedIn && (
    <Container>
      <LoginForm/>
    </Container>
  )
}

export default Login

Login.getLayout = page => (
  <Layout title="Login" auth={false}>
    {page}
  </Layout>
)
