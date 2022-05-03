import { Alert, Anchor, Loader, Space, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FiAlertTriangle } from 'react-icons/fi'
import Layout from '../components/core/Layout'
import useVerify from '../services/hooks/useVerify'

function Verify() {
  const media = useMediaQuery('(min-width: 576px)')
  const router = useRouter()
  const { token } = router.query
  const verifyQuery = useVerify(token)

  if (verifyQuery.isLoading) {
    return <Loader />
  }

  return (
    <Stack
      sx={{ width: media ? 500 : '100% ', padding: media ? '2em' : '0.5em' }}
    >
      {verifyQuery.isError ? (
        <Alert icon={<FiAlertTriangle size={24} />} title="Error" color="red">
          <Text>Verification länken är invalid eller har gått ut.</Text>
        </Alert>
      ) : (
        <Alert
          icon={<AiOutlineCheckCircle size={24} />}
          title="Verifierad"
          color="green"
        >
          <Text>Ditt konto har nu verifierats.</Text>
          <Space h="md" />
          <Text>
            Klicka <Anchor href="/logga-in">här </Anchor>för att logga in.
          </Text>
        </Alert>
      )}
    </Stack>
  )
}

export default Verify
Verify.getLayout = (page) => (
  <Layout title="Verifiera" auth={false}>
    {page}
  </Layout>
)
