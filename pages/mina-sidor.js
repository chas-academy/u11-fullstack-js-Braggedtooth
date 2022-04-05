import { Paper, Tabs } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useState } from 'react'
import { FcBookmark, FcComments, FcRatings, FcServices } from 'react-icons/fc'
import Account from '../components/account'
import Layout from '../components/Layout'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0)
  const media = useMediaQuery('(min-width: 900px)')
  return (
    <Paper shadow="md" p="md" style={{ width: '100%', height: '100%' }}
           withBorder>

      <Tabs active={activeTab} onTabChange={setActiveTab} tabPadding="lg" grow variant={'outline'}
            orientation={media ? 'vertical' : 'horizontal'}
            styles={(theme) => ({
              root: { width: '100%', fontSize: theme.fontSizes.md },
              body: { width: '100%' },
              tabControl: { padding: theme.spacing.lg, textAlign: 'center' }
            })}
      >
        <Tabs.Tab label="Konto" icon={<FcBookmark size={media ? 24 : 16}/>}>
          <Account/>
        </Tabs.Tab>
        <Tabs.Tab label="Recensioner" icon={<FcRatings size={media ? 24 : 16}/>}>
          Mina Recensioner
        </Tabs.Tab>
        <Tabs.Tab label="Kommentarer" icon={<FcComments size={media ? 24 : 16}/>}>
          Mina Kommentarer
        </Tabs.Tab>
        <Tabs.Tab label="Inställningar" icon={<FcServices size={media ? 24 : 16}/>}>
          Mina Inställningar
        </Tabs.Tab>
      </Tabs>

    </Paper>
  )
}

export default Profile
Profile.getLayout = page => (
  <Layout title="Profile" auth>
    {page}
  </Layout>
)
