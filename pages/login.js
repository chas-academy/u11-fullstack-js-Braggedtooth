import React from 'react'
import LoginForm from '../components/forms/Login'
import Layout from '../components/Layout'
import Container from '../components/core/Container'

const loginStyle = {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  width: '80%',
  margin: '10rem auto'

}
const shadow = {
  minWidth: '80%',
  width: '20%',
  padding: '1rem',
  boxShadow: ' 4px 7px 22px 1px rgba(24,22,53,0.76)',
  webkitBoxShadow: '4px 7px 22px 1px rgba(24,22,53,0.76)',
  mozBoxShadow: '4px 7px 22px 1px rgba(24,22,53,0.76)'
}
const Login = () => {
  return (
    <Container customStyle={loginStyle}>
      <h1 className='mb-6'>Login</h1>
      <LoginForm />
    </Container>
  )
}

export default Login

Login.getLayout = (page) => <Layout title='Login'>{page}</Layout>
