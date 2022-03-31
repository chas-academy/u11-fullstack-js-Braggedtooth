import React from 'react'
import Container from '../components/core/Container'
import LoginForm from '../components/forms/Login'
import Layout from '../components/Layout'

const Login = () => {

  return (
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
