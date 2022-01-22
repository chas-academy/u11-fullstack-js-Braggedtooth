import React from 'react'
import LoginForm from '../components/forms/Login';
import Layout from '../components/Layout';

const Login = () => {
    return (
        <div>
              <LoginForm/>
        </div>
    )
}

export default Login

Login.getLayout =(page)=><Layout title="Login">{page}</Layout>