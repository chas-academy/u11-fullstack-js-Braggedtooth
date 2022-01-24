import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Navbar.module.css'
import classNames from 'classnames/bind'
import { GiStarSwirl } from 'react-icons/gi'
const LoggedIn = () => {
  return (
    <nav className={styles.navigation}>
      <Link href='/profile'>
        <a>
          Mina Sidor
        </a>
      </Link>
      <Link href='/reviews'>
        <a>
          Recensioner
        </a>
      </Link>
      <Link href='/login'>
        <a>
          Logga ut
        </a>
      </Link>
    </nav>
  )
}
const LoggedOut = () => {
  return (
    <nav className={styles.navigation}>
      <Link href='/login'>
        <a>
          Logga in
        </a>
      </Link>
      <Link href='/about'>
        <a>
          Om oss
        </a>
      </Link>
    </nav>
  )
}
const Logo = () => {
  return (
    <Link href='/' passHref>
      <span className='has-background-dark p-4 has-text-black'>
        <a>
          <GiStarSwirl />  Mäklar Visionen
        </a>
      </span>
    </Link>
  )
}
const cx = classNames.bind(styles)

const Navbar = ({ user, loading }) => {
  return (
    <header className={classNames({ ' has-background-primary': true, [styles.navbar]: true })}>
      <Logo />

      {
        !loading && (
          user ? <LoggedIn /> : <LoggedOut />
        )
      }

    </header>
  )
}

export default Navbar
