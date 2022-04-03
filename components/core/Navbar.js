import { Anchor, Box, Burger, Group, Header, Menu, MenuItem, Text, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { MdAttribution, MdLogin, MdLogout, MdPerson, MdReviews } from 'react-icons/md'
import useProfile from '../../services/hooks/useProfile'
import useStore from '../../services/hooks/useStore'
import LogoIcon from './logo.svg'

const LoggedIn = () => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const { LogOut } = useProfile()
  return (
    <Menu
      placement="center"
      gutter={6}
      onClose={() => setOpened(!opened)}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      }
    >
      <MenuItem icon={<MdPerson/>} component={Anchor} href="/mina-sidor">
        <Text size="sm" color="gray">
          Mina Sidor
        </Text>
      </MenuItem>
      <MenuItem icon={<MdReviews/>} component={Anchor} href="/reviews">
        <Text size="sm" color="gray">
          Recensioner
        </Text>
      </MenuItem>
      <MenuItem
        icon={<MdLogout/>}
        color="red"
        onClick={async () => {
          await LogOut(undefined, undefined)
        }}
      >
        Logga ut
      </MenuItem>
    </Menu>
  )
}
const LoggedOut = () => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  return (
    <Menu
      placement="center"
      gutter={6}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      }
    >
      <MenuItem icon={MdAttribution} component={Anchor} href="/about">
        <Text size="md">
          Om oss
        </Text>
      </MenuItem>
      <MenuItem color="green" component={Anchor} href="/login" icon={MdLogin}>
        <Text size="md">
          Logga in
        </Text>
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
      <Image src={LogoIcon} height={50} width={50} alt="logo"/>
      <Link href="/" passHref>
        <Anchor
          size="xl"
          color="red"
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
  const { isLoggedIn } = useStore().store
  return (
    <Header
      height={70}
      p="md"
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
        <Logo/>
      </div>
      <Group position="apart">{isLoggedIn ? <LoggedIn/> : <LoggedOut/>}</Group>
    </Header>

  )
}

export default Appbar
