import { Button, Center, Container, List, MediaQuery, Paper, Title, useMantineTheme } from '@mantine/core'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { MdCheckCircle } from 'react-icons/md'
import Routes from '../services/routes'

const animated = dynamic(() => import('../assets/animated.svg'))

const Search = dynamic(() => import('../components/core/Search'))
const Layout = dynamic(() => import('../components/core/Layout'))
export default function Home () {
  const { login } = Routes()
  const theme = useMantineTheme()
  return (
    <>
      <Center style={{ width: '100% ' }}>
        <Title align="center">Välkommen Till Mäklar Visionen</Title>
      </Center>
      <Search />
      <MediaQuery
        largerThan="md"
        styles={{
          display: 'flex',
          flexDirection: theme.breakpoints.md ? 'row' : 'column',
          width: '100vw'
        }}
      >
        <Container style={{ width: '100%', padding: 0 }}>
          <Paper
            shadow="sm"
            p="lg"
            radius={0}
            style={{ backgroundColor: theme.colors.orange[9] }}
          >
            <Title align="center" order={2}>
              Hitta och betygsätt{' '}
            </Title>
            <Center>
              <Image
                src={animated}
                width={500}
                height={500}
                alt="Illustration of realtors"
              />
            </Center>
          </Paper>
          <Paper
            shadow="sm"
            p="md"
            radius={0}
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center'
            }}
          >
            <List
              spacing="md"
              p="md"
              mb="sm"
              icon={<MdCheckCircle size={16} />}
            >
              <List.Item>
                Sök genom alla registerade mäklare i Sverige
              </List.Item>
              <List.Item>
                {' '}
                Lämna rescensioner och dela med dig din upplevelse
              </List.Item>
              <List.Item>
                {' '}
                Lämna kommentarer och får hjälp och tips från andra användare
              </List.Item>
            </List>
            <Button onClick={login}>Registera dig nu!</Button>
          </Paper>
        </Container>
      </MediaQuery>
    </>
  )
}
Home.getLayout = page => (
  <Layout title="Home" auth={false}>
    {page}
  </Layout>
)
