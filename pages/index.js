import { Container } from '@mantine/core'
import Search from '../components/core/search'
import Layout from '../components/Layout'

export default function Home () {
  //const { result } = useSearch()
  return (
    <Container>
      <h1 className="title has-text-centered">
        Välkommen Till Real Agent Rating
      </h1>
      <Search/>
    </Container>

  )
}
Home.getLayout = page => (
  <Layout title="Home" auth={false}>
    {page}
  </Layout>
)
