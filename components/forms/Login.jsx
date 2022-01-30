import { useBooleanToggle, useForm, useLocalStorageValue } from '@mantine/hooks'
import { useState } from 'react'
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons'
import { login } from '../../services/lib/auth'
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Anchor,
  Center,
  Title
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { BiCheck, BiError } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { objToString } from '../../services/lib/helpers'
import RegisterForm from './Register'
import useUser from '../../services/hooks/useUser'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()
  const [type, toggle] = useBooleanToggle(true)
  const router = useRouter()
  const { addUserToStore } = useUser()
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
    login(data)
      .then(res => {
        notifications.showNotification({
          color: 'green',
          message: res.data.message,
          icon: <BiCheck />
        })
        addUserToStore(res.data.User)
        setLoading(false)
        router.push('/profile')
      })
      .catch(error => {
        const err = error.response.data
        notifications.showNotification({
          title: error.response.status,
          message: err.error.message,
          color: 'red',
          icon: <BiError />
        })
      })
      .finally(setLoading(false))
  }

  return (
    <Paper
      padding='lg'
      shadow='lg'
      style={{
        position: 'relative'
      }}
    >
      <Center padding='lg' mb='md'>
        <Title>{type ? 'Logga in' : 'Skapa Konto '}</Title>
      </Center>
      {type ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={loading} />
          <TextInput
            mt='md'
            required
            placeholder='Mailadress'
            label='Mailadress'
            type='email'
            icon={<EnvelopeClosedIcon />}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            mt='md'
            required
            placeholder='Lösenord'
            label='Lösenord'
            icon={<LockClosedIcon />}
            {...form.getInputProps('password')}
          />
          <Group position='apart' mt='xl'>
            <Text>
              Inget Konto?{' '}
              <Anchor
                component='button'
                type='button'
                size='md'
                onClick={() => toggle()}
              >
                Registera dig
              </Anchor>
            </Text>
            <Button color='blue' type='submit' aria-label='Logga in'>
              Logga in
            </Button>
          </Group>
        </form>
      ) : (
        <RegisterForm toggle={toggle} />
      )}
    </Paper>
  )
}

export default LoginForm
