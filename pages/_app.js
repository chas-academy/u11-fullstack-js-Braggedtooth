import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { createStore, StateMachineProvider } from 'little-state-machine'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/style.scss'

createStore({
  isLoggedIn: false,
  token: '',
  user: {}
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3,
    }
  }
})

function MyApp ({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ loader: 'bars', colorScheme: 'light', fontFamily: 'Rajdhani ', primaryColor: 'teal', }}
        >
          <NotificationsProvider>
            <StateMachineProvider>
              {Component.getLayout && getLayout(<Component {...pageProps} />)}
            </StateMachineProvider>
          </NotificationsProvider>
        </MantineProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
