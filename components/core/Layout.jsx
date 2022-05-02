import { AppShell, Center, Container, Modal, Text } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useStore from '../../services/hooks/useStore'
import LoginForm from '../forms/Login'
import Appbar from './Navbar'

function CustomHeader({ toggle, opened }) {
  return <Appbar setOpened={toggle} opened={opened} />
}

const Layout = ({ title, children, auth }) => {
  const router = useRouter()
  const { isLoggedIn } = useStore().store

  const [opened, setOpened] = useState(false)
  return (
    <>
      <Head>
        <title>{title || 'MV'}</title>
      </Head>
      <AppShell
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
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
          }
        })}
      >
        {!auth || isLoggedIn ? (
          <Container
            style={{
              height: '100%',
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              maxWidth: '100%'
            }}
          >
            {children}
          </Container>
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
            <LoginForm />
          </Modal>
        )}
      </AppShell>
    </>
  )
}
export default Layout
