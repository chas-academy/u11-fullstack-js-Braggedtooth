import React from 'react';
import { Head } from 'next/head';

const Layout = ({title, children}) => {
  <Head>
  <title>{title || "Hello"}</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
  return <> <div> Layout tilllagd</div> <p>{title}</p>{children}</>;
};

export default Layout;
