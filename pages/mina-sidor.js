import { Container, Paper, Tabs, Title } from '@mantine/core'
import React, { useState } from 'react'
import { FcBookmark, FcComments, FcRatings, FcServices } from 'react-icons/fc'
import Account from '../components/account'
import Layout from '../components/Layout'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Paper shadow="md" p="xl" style={{ width: '100%', height: '50%' }}>
      <Title order={2} align="center">
        Mina Sidor
      </Title>

      <Container fluid>
        <Tabs active={activeTab} onTabChange={setActiveTab} tabPadding="sm" grow variant={'outline'}
              orientation={'vertical'}
              styles={{
                body: { width: '100%' },
              }}
        >
          <Tabs.Tab label="Konto" icon={<FcBookmark/>}>
            <Account/>
          </Tabs.Tab>
          <Tabs.Tab label="Recensioner" icon={<FcRatings/>}>
            Mina Recensioner
          </Tabs.Tab>
          <Tabs.Tab label="Kommentarer" icon={<FcComments/>}>
            Mina Kommentarer
          </Tabs.Tab>
          <Tabs.Tab label="Inställningar" icon={<FcServices/>}>
            Mina Inställningar
          </Tabs.Tab>
        </Tabs>
      </Container>
    </Paper>
  )
}

export default Profile
Profile.getLayout = page => (
  <Layout title="Profile" auth>
    {page}
  </Layout>
)
