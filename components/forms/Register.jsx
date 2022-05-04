import { Anchor, Button, Group, LoadingOverlay, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { registerAcc } from '../../services/lib/auth'
import useUSers from '../../services/hooks/useUsers'

const RegisterForm = ({ toggle, type }) => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()
  const { addUser } = useUSers()
  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationRules: {
      firstname: (value) => value.trim(),
      lastname: (value) => value.trim(),
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        )
    },
    errorMessages: {
      firstname: 'Du måste ange ditt förnamn',
      lastname: 'Du måste ange ditt efternamn',
      email: 'Vänligen ange ett giltigt mailadress',
      password:
        'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav , en siffra och en speciell tecken'
    }
  })
  const handleSubmit = (data) => {
    setLoading(true)
    if (type === 'admin') {
      return addUser
        .mutateAsync(data)
        .then((res) => {
          notifications.showNotification({
            color: 'green',
            message: res.data.message,
            icon: <BiCheck />
          })
          toggle()
        })
        .catch((error) => {
          notifications.showNotification({
            message: error.response.data.error,
            color: 'red',
            icon: <BiError />
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
    return registerAcc(data)
      .then((res) => {
        notifications.showNotification({
          color: 'green',
          message: res.data.message,
          icon: <BiCheck />
        })
        toggle()
      })
      .catch((error) => {
        notifications.showNotification({
          message: error.response.data.error,
          color: 'red',
          icon: <BiError />
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />
      <Group grow>
        <TextInput
          data-autofocus
          required
          name="firstname"
          placeholder="Ditt förnamn"
          label="Förnamn"
          {...form.getInputProps('firstname')}
        />

        <TextInput
          required
          name="lastname"
          placeholder="Ditt efternamn"
          label="Efternamn"
          {...form.getInputProps('lastname')}
        />
      </Group>
      <TextInput
        mt="md"
        required
        name="email"
        placeholder="Mailadress"
        label="Mailadress"
        type="email"
        icon={<FaEnvelope />}
        {...form.getInputProps('email')}
      />

      <PasswordInput
        mt="md"
        required
        placeholder="Lösenord"
        label="Lösenord"
        icon={<FaLock />}
        {...form.getInputProps('password')}
      />
      <Group position="apart" mt="xl">
        <Text>
          Redan registrerad?{' '}
          <Anchor
            component="button"
            type="button"
            size="md"
            onClick={() => toggle()}
          >
            Logga in
          </Anchor>
        </Text>
        <Button color="blue" type="submit" aria-label="Logga in">
          Registrera
        </Button>
      </Group>
    </form>
  )
}

export default RegisterForm
