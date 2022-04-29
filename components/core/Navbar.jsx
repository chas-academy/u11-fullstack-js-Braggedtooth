import { Anchor, Burger, Group, Header, Menu, MenuItem, Text, useMantineTheme } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  MdAttribution,
  MdLogin,
  MdLogout,
  MdPerson,
  MdReviews,
  MdAdminPanelSettings
} from 'react-icons/md'
import useProfile from '../../services/hooks/useProfile'
import useStore from '../../services/hooks/useStore'
import Logo1 from './Logo'

const MenuItems = () => {
  const { LogOut } = useProfile()
  const [opened, setOpened] = useState(false)
  const { isLoggedIn, user } = useStore().store
  const theme = useMantineTheme()
  return (
    <Menu
      placement="center"
      gutter={6}
      onClose={() => setOpened(false)}
      control={
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size="md"
          color={theme.colors.gray[3]}
        />
      }
    >
      {isLoggedIn && (
        <MenuItem icon={<MdPerson />} component={Anchor} href="/mina-sidor">
          <Text size="lg">Mina Sidor</Text>
        </MenuItem>
      )}
      <MenuItem icon={<MdAttribution />} component={Anchor} href="/om-oss">
        <Text size="lg">Om oss</Text>
      </MenuItem>
      <MenuItem icon={<MdReviews />} component={Anchor} href="/recensioner">
        <Text size="lg">Recensioner</Text>
      </MenuItem>
      {user.role === 'ADMIN' && (
        <MenuItem
          icon={<MdAdminPanelSettings />}
          component={Anchor}
          href="/admin"
        >
          <Text size="lg">Admin</Text>
        </MenuItem>
      )}
      {!isLoggedIn ? (
        <MenuItem component={Anchor} href="/logga-in" icon={<MdLogin />}>
          <Text size="lg" color="green">
            Logga in
          </Text>
        </MenuItem>
      ) : (
        <MenuItem
          icon={<MdLogout />}
          color="red"
          onClick={async () => {
            await LogOut(undefined, undefined)
          }}
        >
          {' '}
          <Text size="lg">Logga ut</Text>{' '}
        </MenuItem>
      )}
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
      <Group position='apart'> <MenuItems /></Group>
    </Header>

  )
}

export default Appbar
