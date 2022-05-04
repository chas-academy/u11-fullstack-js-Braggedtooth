import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import { createStore, StateMachineProvider } from 'little-state-machine'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

createStore({
  isLoggedIn: false,
  token: '',
  user: {}
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 50000,
      retry: 3,
      refetchInterval: 10000
    }
  }
})

function MyApp ({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const getLayout = Component.getLayout || (page => page)
  const customTheme = {
    colorScheme,
    colors: {
      dark: [
        '#d5d7e0',
        '#acaebf',
        '#8c8fa3',
        '#666980',
        '#4d4f66',
        '#34354a',
        '#2b2c3d',
        '#1d1e30',
        '#0c0d21',
        '#01010a',
      ],
      gray: [
        '#F8F9FA',
        '#B9C2CB',
        '#b3b3b3',
        '#a4a4a4',
        '#48484c',
        '#616161',
        '#A1A1A0',
        '#797a80',
        '#596366',
        '#48484c',
        '#212529',
      ]

    },
    loader: 'bars',
    fontFamily: 'Rajdhani',
    primaryColor: 'orange',
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          emotionOptions={{ key: 'mvapp' }}
          withGlobalStyles
          withNormalizeCSS
          theme={customTheme}
        >
          <NotificationsProvider position="top-center">
            <StateMachineProvider>
              {Component.getLayout && getLayout(<Component {...pageProps} />)}
            </StateMachineProvider>
          </NotificationsProvider>
        </MantineProvider>
        <ReactQueryDevtools />
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}

// export default MyApp
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false
})
