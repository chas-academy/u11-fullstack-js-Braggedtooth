import {
  Anchor,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useBooleanToggle, useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import useProfile from '../../services/hooks/useProfile'
import RegisterForm from './Register'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()
  const [type, toggle] = useBooleanToggle(true)
  const router = useRouter()
  //const {  } = useStore().store
  const { Login } = useProfile()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: value => /^\S+@\S+$/.test(value),
      password: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
    },
    errorMessages: {
      email: 'Vänligen ange ett giltigt mailadress',
      password: 'Ange ett lösenord '
    }
  })
  const handleSubmit = data => {
    setLoading(true)
    Login(data)
      .then(res => {
        setLoading(false)
        router.push('/mina-sidor')
        notifications.showNotification({
          color: 'green',
          message: res.data.message,
          icon: <BiCheck/>
        })

      })
      .catch(error => {
        console.log(error)
        // const err = error.
        //  notifications.showNotification({
        //  title: error.response.status,
        //  message: err.error.message,
        //   color: 'red',
        //   icon: <BiError/> }  )

      })
      .finally(() => setLoading(false))
  }

  return (
    <Paper
      p="lg"
      shadow="lg"
      style={{
        position: 'relative'
      }}
    >
      <Center p="lg" mb="md">
        <Title>{type ? 'Logga in' : 'Skapa Konto '}</Title>
      </Center>
      {type ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading}/>
          <TextInput
            mt="md"
            required
            placeholder="Mailadress"
            label="Mailadress"
            type="email"
            icon={<EnvelopeClosedIcon/>}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Lösenord"
            label="Lösenord"
            icon={<LockClosedIcon/>}
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="xl">
            <Text>
              Inget Konto?{' '}
              <Anchor
                component="button"
                type="button"
                size="md"
                onClick={() => toggle()}
              >
                Registera dig
              </Anchor>
            </Text>
            <Button color="blue" type="submit" aria-label="Logga in">
              Logga in
            </Button>
          </Group>
        </form>
      ) : (
        <RegisterForm toggle={toggle}/>
      )}
    </Paper>
  )
}

export default LoginForm
