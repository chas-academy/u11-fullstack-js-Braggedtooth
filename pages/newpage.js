import React from 'react';
import Layout from '../components/Layout';

const newpage = () => {
  return <div>newpage</div>;
};

export default newpage;
newpage.getLayout= (page)=><Layout title="Testa">{page}</Layout>