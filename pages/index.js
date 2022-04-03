import { Button, Center, Divider, List, Paper, Title } from '@mantine/core'
import Image from 'next/image'
import { MdCheckCircle } from 'react-icons/md'
import animated from '../assets/animated.svg'
import Search from '../components/core/search'
import Layout from '../components/Layout'
import Routes from '../services/routes'

export default function Home () {
  const { login } = Routes()
  return (
    <>
      <h1 className="title has-text-centered">
        Välkommen Till Mäklar Visionen
      </h1>
      <Paper shadow="sm" p="md" withBorder>
        <Title align="left" order={2}>Hitta och betygsätt </Title>
        <Center>
          <List
            spacing="xs"
            size="md"
            center
            icon={<MdCheckCircle size={16}/>}
          >
            <List.Item>Sök genom alla registerade mäklare i Sverige</List.Item>
            <Divider my="sm"/>
            <List.Item> Lämna rescensioner och dela med dig din upplevelse</List.Item>
            <List.Item> Lämna kommentarer och får hjälp och tips från andra användare</List.Item>

          </List>
          <Image src={animated} alt="Illustration of realtors"/>
        </Center>
        <Button onClick={login}>Registera dig nu!</Button>
      </Paper>

      <Search/>
    </>

  )
}
Home.getLayout = page => (
  <Layout title="Home" auth={false}>
    {page}
  </Layout>
)
