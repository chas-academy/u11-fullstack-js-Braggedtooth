import React from 'react';
import { Head } from 'next/head';
import Navbar from './core/Navbar';
import Container from './core/Container';
import Footer from './core/Footer';
const newStyle = {
  display:"flex",
  color:"red",
  flexDirection: "column",
  height:"100%",
  alignItems:"center",
  justifyContent:"center"
}
const Layout = ({title, children}) => {
  <Head>
  <title>{title || "Hello"}</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
  return ( 
  <Container customStyle={{height:"100vh", justifyContent:"space-between"}}>
    <Navbar user={false} loading={false}/>
    <Container customStyle={newStyle}>
        <div> Layout tilllagd</div> 
        <p>{title}</p>
          {children}
    </Container>
    <Footer/>
   </Container>)
};

export default Layout;
