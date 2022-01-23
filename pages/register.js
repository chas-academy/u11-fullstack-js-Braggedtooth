import React from 'react'
import RegisterForm from '../components/forms/Register'
import Layout from '../components/Layout'
import Container from '../components/core/Container'

const RegisterStyle = {
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
const Register = () => {
  return (
    <Container customStyle={RegisterStyle}>

      <RegisterForm />
    </Container>
  )
}

export default Register

Register.getLayout = (page) => <Layout title='Register'>{page}</Layout>
