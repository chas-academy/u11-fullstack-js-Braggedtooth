import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Container, Tabs } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const Account = dynamic(() => import('../components/core/Account'))
const Layout = dynamic(() => import('../components/core/Layout'))
const Reviews = dynamic(() => import('./recensioner'))

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0)
  const media = useMediaQuery('(min-width: 900px)')
  return (
    <Container p="lg">
      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        tabPadding="lg"
        variant="unstyled"
        orientation="horizontal"
        color="orange"
        grow={!media}
        styles={(theme) => ({
          root: {
            width: '100%',
            height: '100%'
          },

          tabControl: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[4],
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark
                : theme.colors.gray,
            fontSize: !media ? theme.fontSizes.sm : theme.fontSizes.lg
          },
          tabActive: {
            backgroundColor: theme.colors.blue[2],
            borderColor: theme.colors.blue[2],
            color: theme.colors.dark[9]
          }
        })}
      >
        <Tabs.Tab label="Konto" ml={2}>
          <Account />
        </Tabs.Tab>
        <Tabs.Tab label="Recensioner " ml={2}>
          <Reviews user />
        </Tabs.Tab>
        {/*      <Tabs.Tab label="Kommentarer" ml={2}>
          Mina Kommentarer
        </Tabs.Tab> */}
      </Tabs>
    </Container>
    // </Paper>
  )
}

export default Profile
Profile.getLayout = (page) => (
  <Layout title="Profile" auth>
    {page}
  </Layout>
)
