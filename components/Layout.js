import React from 'react'
import Head from 'next/head'
import Navbar from './core/Navbar'
import Container from './core/Container'
import Footer from './core/Footer'
const newStyle = {
  display: 'flex',
  color: 'red',
  flexDirection: 'column',
  height: '100%'
}
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'RealRate'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container customStyle={{ height: '100vh', justifyContent: 'space-between' }}>
        <Navbar user={false} loading={false} />
        <Container customStyle={newStyle}>
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  )
}

export default Layout