import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Paper, Tabs, Title } from '@mantine/core'
import { FcServices, FcComments, FcRatings, FcBookmark } from 'react-icons/fc'
import Account from '../components/account'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)
  return (
    <Paper shadow='md' padding='xl'>
      <Paper withBorder padding='xs'>
        <Title order={2} align='center'>
          Mina Sidor
        </Title>
      </Paper>
      <Container>
        <Tabs active={activeTab} onTabChange={setActiveTab} grow>
          <Tabs.Tab label='Konto ' icon={<FcBookmark />}>
            <Account />
          </Tabs.Tab>
          <Tabs.Tab label='Recensioner' icon={<FcRatings />}>
            Mina Recensioner
          </Tabs.Tab>
          <Tabs.Tab label='Kommentarer' icon={<FcComments />}>
            Mina Kommentarer
          </Tabs.Tab>
          <Tabs.Tab label='Inställningar' icon={<FcServices />}>
            Mina Inställningar
          </Tabs.Tab>
        </Tabs>
      </Container>
    </Paper>
  )
}

export default Profile
Profile.getLayout = page => (
  <Layout title='Profile' auth>
    {page}
  </Layout>
)
