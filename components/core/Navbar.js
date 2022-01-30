import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GiStarSwirl } from 'react-icons/gi'
import useUser from '../../services/hooks/useUser'
import { logout } from '../../services/lib/auth'
import LogoIcon from './logo.svg'
import _ from 'lodash'
import {
  Box,
  Burger,
  Group,
  Header,
  Anchor,
  Menu,
  MenuItem,
  Paper,
  Text,
  useMantineTheme
} from '@mantine/core'

import {
  MdAttribution,
  MdLogin,
  MdLogout,
  MdPerson,
  MdReviews
} from 'react-icons/md'
import Image from 'next/image'
const LoggedIn = () => {
  const [opened, setOpened] = useState()
  const theme = useMantineTheme()
  const { removeUserFromStore } = useUser()
  return (
    <Menu
      placement='center'
      gutter={6}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(o => !o)}
          size='sm'
          color={theme.colors.gray[6]}
          mr='xl'
        />
      }
    >
      <MenuItem icon={<MdPerson />}>
        <Link href='/profile' passHref>
          <Text size='sm' color='gray'>
            Mina Sidor{' '}
          </Text>
        </Link>
      </MenuItem>
      <MenuItem icon={<MdReviews />}>
        <Link href='/reviews' passHref>
          <Text size='sm' color='gray'>
            Recensioner
          </Text>
        </Link>
      </MenuItem>
      <MenuItem
        icon={<MdLogout />}
        color='red'
        onClick={() => {
          logout()
          removeUserFromStore()
        }}
      >
        Logga ut
      </MenuItem>
    </Menu>
  )
}
const LoggedOut = () => {
  const [opened, setOpened] = useState()
  const theme = useMantineTheme()
  return (
    <Menu
      placement='center'
      gutter={6}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(o => !o)}
          size='sm'
          color={theme.colors.gray[6]}
          mr='xl'
        />
      }
    >
      <MenuItem icon={<MdAttribution />}>
        <Link href='/about' passHref>
          <Text size='sm' color='gray'>
            Om oss
          </Text>
        </Link>
      </MenuItem>
      <MenuItem color='green' icon={<MdLogin />}>
        <Link href='/login' passHref>
          <Text size='sm' color='gray'>
            Logga in
          </Text>
        </Link>
      </MenuItem>
    </Menu>
  )
}
const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Image src={LogoIcon} height={50} width={50} alt='logo' />
      <Link href='/' passHref>
        <Anchor
          size='xl'
          color='red'
          style={{
            marginLeft: '10px',
            fontFamily: 'Post No Bills Jaffna Medium'
          }}
        >
          Mäklar Visionen
        </Anchor>
      </Link>
    </Box>
  )
}

const Appbar = () => {
  const { user } = useUser()
  const [nav, toggle] = useState()
  useEffect(() => {
    if (_.isEmpty(user)) {
      toggle(false)
    }
    if (!_.isEmpty(user)) toggle(true)
  }, [user])
  return (
    <Header
      height={70}
      padding='md'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Logo />
      </div>
      <Group position='apart'>{nav ? <LoggedIn /> : <LoggedOut />}</Group>
    </Header>
  )
}

export default Appbar
