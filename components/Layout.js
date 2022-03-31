import { AppShell, Center, Container, Modal, Text } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useStore from '../services/hooks/useStore'
import Appbar from './core/Navbar'
import LoginForm from './forms/Login'

const Layout = ({ title, children, auth }) => {
  const [authState, setAuth] = useState()
  const router = useRouter()
  const { store } = useStore()
  const { isLoggedIn } = store
  useEffect(() => {
    setAuth(isLoggedIn)
    // if (_.isEmpty(user)) {
    // setAuth(false)
    //}
    //if (!_.isEmpty(user)) setAuth(true)
  }, [isLoggedIn])

  function CustomHeader (props) {
    return <Appbar setOpened={props.toggle} opened={props.opened}/>
  }

  const [opened, setOpened] = useState(false)
  return (
    <>
      <Head>
        <title>{title || 'MV'}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <AppShell
        padding="-60px"
        fixed
        navbarOffsetBreakpoint="sm"
        header={
          <CustomHeader
            height={60}
            padding="xs"
            user
            op={opened}
            toggle={setOpened}
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
        {!auth || authState ? (
          <Container width={'60'}>{children}</Container>
        ) : (
          <Modal
            centered
            opened
            onClose={() => router.push('/')}
            closeOnClickOutside
          >
            <Center>
              <Text color="red">
                {' '}
                Du måste logga in för att komma åt denna sidan
              </Text>
            </Center>
            <LoginForm/>
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
