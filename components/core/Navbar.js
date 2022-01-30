import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Navbar.module.css'
import classNames from 'classnames/bind'
import { GiStarSwirl } from 'react-icons/gi'
import useUser from '../../services/hooks/useUser'
import { logout } from '../../services/lib/auth'
import { useBooleanToggle, useToggle } from '@mantine/hooks'
import _ from 'lodash'
const LoggedIn = () => {
  const { removeUserFromStore } = useUser()
  return (
    <nav className={styles.navigation}>
      <Link href='/profile'>
        <a>Mina Sidor</a>
      </Link>
      <Link href='/reviews'>
        <a>Recensioner</a>
      </Link>
      <button
        onClick={() => {
          logout()
          removeUserFromStore()
        }}
      >
        <a>Logga ut</a>
      </button>
    </nav>
  )
}
const LoggedOut = () => {
  return (
    <nav className={styles.navigation}>
      <Link href='/login'>
        <a>Logga in</a>
      </Link>
      <Link href='/about'>
        <a>Om oss</a>
      </Link>
    </nav>
  )
}
const Logo = () => {
  return (
    <Link href='/' passHref>
      <span className='has-background-dark p-4 has-text-black'>
        <a>
          <GiStarSwirl /> Mäklar Visionen
        </a>
      </span>
    </Link>
  )
}

const Navbar = () => {
  const { user } = useUser()
  const [nav, toggle] = useState()
  useEffect(() => {
    if (_.isEmpty(user)) {
      toggle(false)
    }
    if (!_.isEmpty(user)) toggle(true)
  }, [user])
  return (
    <header
      className={classNames({
        ' has-background-primary': true,
        [styles.navbar]: true
      })}
    >
      <Logo />
      {nav ? <LoggedIn /> : <LoggedOut />}
    </header>
  )
}

export default Navbar
