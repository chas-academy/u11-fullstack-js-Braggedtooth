import { Anchor, Button, Group, LoadingOverlay, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons'
import { useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { registerAcc } from '../../services/lib/auth'

const RegisterForm = ({ toggle }) => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()
  const form = useForm({
    initialValues: {
      firtname: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationRules: {
      firstname: value => value.trim(),
      lastname: value => value.trim(),
      email: value => /^\S+@\S+$/.test(value),
      password: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
    },
    errorMessages: {
      firstname: 'Du måste ange ditt förnamn',
      lastname: 'Du måste ange ditt efternamn',
      email: 'Vänligen ange ett giltigt mailadress',
      password: 'Lösenordet måste inehålla minst en stor bokstav och en siffra'
    }
  })
  const handleSubmit = data => {
    setLoading(true)
    registerAcc(data)
      .then(res => {
        notifications.showNotification({
          color: 'green',
          message: res.data.message,
          icon: <BiCheck/>
        })
        toggle()
      })
      .catch(error => {
        notifications.showNotification({
          message: error.message,
          color: 'red',
          icon: <BiError/>
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading}/>
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
    </>
  )
}

export default RegisterForm
