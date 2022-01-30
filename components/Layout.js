import Head from 'next/head'
import Navbar from './core/Navbar'
import Container from './core/Container'
import Footer from './core/Footer'
import Search from './core/search'
import { useEffect, useState } from 'react'
import useUser from '../services/hooks/useUser'
import LoginForm from './forms/Login'
import _ from 'lodash'

const newStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}
const Layout = ({ title, children, auth }) => {
  const [authState, setAuth] = useState()
  const { user } = useUser()
  useEffect(() => {
    if (_.isEmpty(user)) {
      setAuth(false)
    }
    if (!_.isEmpty(user)) setAuth(true)
  }, [auth, user])
  return (
    <>
      <Head>
        <title>{title || 'RealRate'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container
        customStyle={{ height: '100vh', justifyContent: 'space-between' }}
      >
        <Navbar user />
        <p>{title}</p>
        <Search />
        {!auth || authState ? (
          <Container customStyle={newStyle}>{children}</Container>
        ) : (
          <Container customStyle={newStyle}>
            <LoginForm />
          </Container>
        )}
        <Footer />
      </Container>
    </>
  )
}
export default Layout
