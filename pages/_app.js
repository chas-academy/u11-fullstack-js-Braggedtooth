import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
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
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme, loader: 'bars', fontFamily: 'Rajdhani ', primaryColor: 'teal', }}
          >
            <NotificationsProvider>
              <StateMachineProvider>
                {Component.getLayout && getLayout(<Component {...pageProps} />)}
              </StateMachineProvider>
            </NotificationsProvider>
          </MantineProvider>
          <ReactQueryDevtools/>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
