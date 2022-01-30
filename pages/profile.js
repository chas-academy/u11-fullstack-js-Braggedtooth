/* eslint-disable react/display-name */
import React from 'react'
import Layout from '../components/Layout'

const Profile = () => {
  return <div />
}

export default Profile
Profile.getLayout = page => (
  <Layout title='Profile' auth>
    {page}
  </Layout>
)
