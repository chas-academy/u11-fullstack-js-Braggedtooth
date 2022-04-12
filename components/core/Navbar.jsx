import { Anchor, Burger, Group, Header, Menu, MenuItem, Text, useMantineTheme } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'

import { MdAttribution, MdLogin, MdLogout, MdPerson, MdReviews } from 'react-icons/md'
import useProfile from '../../services/hooks/useProfile'
import useStore from '../../services/hooks/useStore'
import Logo1 from './Logo'

const LoggedIn = () => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const { LogOut } = useProfile()
  return (
    <Menu
      placement='center'
      gutter={6}
      onClose={() => setOpened(false)}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size='md'
          color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8]}
          mr='xl'
        />
      }
    >
      <MenuItem icon={<MdPerson />} component={Anchor} href='/mina-sidor'>
        <Text size='lg'>
          Mina Sidor
        </Text>
      </MenuItem>
      <MenuItem icon={<MdReviews />} component={Anchor} href='/recensioner'>
        <Text size='lg'>
          Recensioner
        </Text>
      </MenuItem>
      <MenuItem
        icon={<MdLogout />}
        color='red'
        onClick={async () => {
          await LogOut(undefined, undefined)
        }}
      > <Text size='lg'>
        Logga ut
        </Text>
      </MenuItem>
    </Menu>
  )
}
const LoggedOut = () => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  return (
    <Menu
      placement='center'
      gutter={6}
      onClose={() => setOpened(false)}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size='md'
          color={theme.colors.gray[9]}
          mr='xl'
        />
      }
    >
      <MenuItem icon={MdAttribution} component={Anchor} href='/om-oss'>
        <Text size='lg'>
          Om oss
        </Text>
      </MenuItem>
      <MenuItem component={Anchor} href='/logga-in' icon={MdLogin}>
        <Text size='lg' color='green'>
          Logga in
        </Text>
      </MenuItem>
    </Menu>
  )
}
const Logo = () => {
  const themes = useMantineTheme()
  return (
    <Link href='/' passHref>
      <Anchor sx={{
        '&:hover': {
          color: themes.colors.gray[9]
        }
      }}
      >
        <Logo1 size={40} color={themes.colorScheme === 'dark' ? themes.primaryColor : themes.colors.dark[8]} />
      </Anchor>

    </Link>

  )
}

const Appbar = () => {
  const { isLoggedIn } = useStore().store
  return (
    <Header
      height={70}
      p='md'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >

      <Logo />

      <Group position='apart'>{isLoggedIn ? <LoggedIn /> : <LoggedOut />}</Group>
    </Header>

  )
}

export default Appbar
