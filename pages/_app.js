import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import '../styles/style.scss'
import { createStore, StateMachineProvider } from 'little-state-machine'
createStore({
  user: {}
})
function MyApp ({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ loader: 'bars', colorScheme: 'dark' }}
      >
        <NotificationsProvider>
          <StateMachineProvider>
            {Component.getLayout && getLayout(<Component {...pageProps} />)}
          </StateMachineProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default MyApp
