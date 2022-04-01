import React from 'react'
import RegisterForm from '../components/forms/Register'
import Layout from '../components/Layout'
import Container from '../components/core/Container'

const RegisterStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'

}

const Register = () => {
  return (
    <Container customStyle={RegisterStyle}>

      <RegisterForm />
    </Container>
  )
}
asPagewith
export default

Register.getLayout = (page) => <Layout title='Register'>{page}</Layout>
