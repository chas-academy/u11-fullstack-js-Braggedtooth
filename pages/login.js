import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/core/Container'
import LoginForm from '../components/forms/Login'
import useUser from '../services/hooks/useUser'
import { useRouter } from 'next/router'

const loginStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'
}

const Login = () => {
  /*   const { user } = useUser()
  const router = useRouter()
  if (user) router.push('/') */
  return (
    <Container>
      <LoginForm />
    </Container>
  )
}

export default Login

Login.getLayout = page => (
  <Layout title='Login' auth={false}>
    {page}
  </Layout>
)
