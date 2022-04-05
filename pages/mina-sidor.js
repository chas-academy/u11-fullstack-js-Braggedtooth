import { Tabs } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useState } from 'react'
import Account from '../components/account'
import Layout from '../components/Layout'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0)
  const media = useMediaQuery('(min-width: 900px)')
  return (
    // <Paper shadow="xs" p="md" style={{
    //   width: '100%',
    //   height: '100%',
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    // }}>

    <Tabs active={activeTab} onTabChange={setActiveTab} tabPadding="lg" variant={'unstyled'}
          orientation={'horizontal'}
          color={'orange'}
          grow={!media}
          styles={(theme) => ({
            root: {
              width: '100%',
              height: '100%',
            },
            tabControl: {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
              fontSize: !media ? theme.fontSizes.sm : theme.fontSizes.lg,

            },
            tabActive: {
              backgroundColor: theme.colors.blue[2],
              borderColor: theme.colors.blue[2],
              color: theme.colors.dark[9],
            },
          })}
    >
      <Tabs.Tab label="Konto" ml={2}>
        <Account/>
      </Tabs.Tab>
      <Tabs.Tab label="Recensioner " ml={2}>
        Mina Recensioner
      </Tabs.Tab>
      <Tabs.Tab label="Kommentarer" ml={2}>
        Mina Kommentarer
      </Tabs.Tab>

    </Tabs>

    // </Paper>
  )
}

export default Profile
Profile.getLayout = page => (
  <Layout title="Profile" auth>
    {page}
  </Layout>
)
