import Link from 'next/link';
import React from 'react';
import styles from "../../styles/Navbar.module.css"
import classNames from 'classnames/bind';
const LoggedIn = ()=> { 
  return (
    <nav className= {styles.navigation}>
    <Link href="/profile">
        <a>
          Account Details
        </a>
    </Link>
    <Link href="/reviews">
        <a>
          My Reviews
        </a>
    </Link>
    <Link href="/logout">
        <a>
          Logout
        </a>
    </Link>
     </nav>
  )
}
const LoggedOut= ()=> { 
  return (
    <nav  className= {styles.navigation}>
    <Link href="/login">
    <a>
      Login
    </a>
    </Link>
    <Link href="/about">
    <a>
      About Us
    </a>
    </Link>
     </nav>
  )
}
const Logo = ()=> { 
  return ( 
    <Link href="/">
      <a>
        Real Agent Rating
      </a>
    </Link>
  )
}
let cx = classNames.bind(styles);

const Navbar = ({user, loading}) => {
  return( 
    <header className={styles.navbar}>
      <Logo/>

      {
        !loading &&(
          user ? <LoggedIn/> : <LoggedOut/>
        )
      }
   
  </header>
  ) 
};

export default Navbar;
