import React from 'react'
import Container from '../components/core/Container'
import RegisterForm from '../components/forms/Register'
import Layout from '../components/Layout'

const RegisterStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'

}

const Register = () => {
  return (
    <Container customStyle={RegisterStyle}>

      <RegisterForm/>
    </Container>
  )
}
export default Register

Register.getLayout = (page) => <Layout title="Register">{page}</Layout>
