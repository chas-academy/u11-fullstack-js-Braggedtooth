import Head from 'next/head'
import Appbar from './core/Navbar'
import Footer from './core/Footer'
import Search from './core/search'
import { useEffect, useState } from 'react'
import useUser from '../services/hooks/useUser'
import LoginForm from './forms/Login'
import _ from 'lodash'
import { AppShell, Center, Container, Modal, Paper, Text } from '@mantine/core'
import { useRouter } from 'next/router'

const Layout = ({ title, children, auth }) => {
  const [authState, setAuth] = useState()
  const router = useRouter()
  const { user } = useUser()
  useEffect(() => {
    if (_.isEmpty(user)) {
      setAuth(false)
    }
    if (!_.isEmpty(user)) setAuth(true)
  }, [auth, user])

  function CustomHeader (props) {
    return <Appbar setOpened={props.togle} opened={props.opened} />
  }
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Head>
        <title>{title || 'RealRate'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppShell
        padding='xl'
        fixed
        navbarOffsetBreakpoint='sm'
        header={
          <CustomHeader
            height={60}
            padding='xs'
            user
            op={opened}
            togle={setOpened}
          />
        }
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0]
          }
        })}
      >
        {/*  <Appbar user /> */}
        {!auth || authState ? (
          <Center>{children}</Center>
        ) : (
          <Modal
            centered
            opened
            onClose={() => router.push('/')}
            closeOnClickOutside
          >
            <Center>
              <Text color='red'>
                {' '}
                Du måste logga in för att komma åt denna sidan
              </Text>
            </Center>
            <LoginForm />
          </Modal>
        )}
      </AppShell>
      {/*     <Navbar user />
        <p>{title}</p>
        <Footer /> */}
      {/*  </Container> */}
    </>
  )
}
export default Layout
