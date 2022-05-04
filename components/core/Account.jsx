import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
  useMantineColorScheme
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import isEmpty from 'lodash/isEmpty'
import React, { useState } from 'react'
import { BsMoonStarsFill, BsSun } from 'react-icons/bs'
import { MdCheck, MdError, MdInfo } from 'react-icons/md'
import useProfile from '../../services/hooks/useProfile'
import useStore from '../../services/hooks/useStore'
import { getChangedProps } from '../../services/lib/actions'

const Account = () => {
  const { user } = useStore().store
  const { EditProfile } = useProfile()
  const [edit, setEdit] = useState(false)
  const [modal, showModal] = useState(false)
  const notifications = useNotifications()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const onSave = (data) => {
    const newProps = {
      ...data,
      role: user.role
    }
    const hasEdit = getChangedProps(user, newProps)
    if (isEmpty(hasEdit)) {
      showModal(false)
      notifications.showNotification({
        message: 'Din profile är oförändrad',
        color: 'blue',
        icon: <MdInfo />
      })
    }
    if (!isEmpty(hasEdit)) {
      EditProfile(data)
        .then(() => {
          showModal(false)
          notifications.showNotification({
            message: 'Din profil har uppdaterats',
            color: 'green',
            icon: <MdCheck />
          })
        })
        .catch(() => {
          showModal(false)
          notifications.showNotification({
            title: 'Någåt gick fel..',
            message: 'Vänligen logga in igen',
            color: 'red',
            icon: <MdError />
          })
        })
    }
  }

  const form = useForm({
    initialValues: {
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname
    }
  })

  return (
    <Container>
      <Title order={2} align="center">
        Konto Inställningar
      </Title>
      <Card
        shadow="sm"
        p="lg"
        mt="sm"
        withBorder
        styles={(theme) => ({
          root: {
            height: 'calc(100% / 6px)',
            backgroundColor: !dark && theme.colors.gray[3]
          }
        })}
      >
        <Group direction="column" p="lg" align="center">
          <Avatar size="lg" />
          <Text size="lg" order={1} color="blue">
            {user.firstname} {user.lastname}
          </Text>
          <Text>{user.email}</Text>
          <Group>
            <Text>{!dark ? 'Mörkt Tema' : 'Ljust Tema'}</Text>
            <ActionIcon
              variant="filled"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              styles={(theme) => ({
                root: {
                  backgroundColor: dark
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2]
                }
              })}
            >
              {dark ? <BsSun size={18} /> : <BsMoonStarsFill size={18} />}
            </ActionIcon>
          </Group>
        </Group>
        <Center>
          <Button
            my="md"
            onClick={() => {
              showModal(true)
              setEdit(!edit)
            }}
          >
            Redigera
          </Button>
        </Center>
      </Card>

      {modal && (
        <Modal opened={modal} centered onClose={() => showModal(false)}>
          <form onSubmit={form.onSubmit(onSave)}>
            <TextInput
              placeholder={user.firstname}
              label="Förnamn"
              {...form.getInputProps('firstname')}
            />
            <TextInput
              placeholder={user.lastname}
              label="Efternamn"
              {...form.getInputProps('lastname')}
            />
            <TextInput
              placeholder={user.email}
              label="Mailaddress"
              {...form.getInputProps('email')}
            />
            <Button type="submit" color="green" my="md">
              Spara
            </Button>
          </form>
        </Modal>
      )}
    </Container>
  )
}
export default Account
