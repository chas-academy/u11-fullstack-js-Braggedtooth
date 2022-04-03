import { Anchor, Button, Center, Group, Modal, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import _ from 'lodash'
import { useState } from 'react'
import { MdCheck, MdError, MdInfo } from 'react-icons/md'
import useProfile from '../services/hooks/useProfile'
import useStore from '../services/hooks/useStore'
import { getChangedProps } from '../services/lib/actions'

const Account = () => {
  const { user } = useStore().store
  const { EditProfile } = useProfile()
  const [edit, setEdit] = useState(false)
  const [modal, showModal] = useState(false)
  const notifications = useNotifications()
  const onSave = data => {
    data.role = 'USER'
    const hasEdit = getChangedProps(user, data)
    if (_.isEmpty(hasEdit)) {
      showModal(false)
      notifications.showNotification({
        message: 'Din profile är oförändrad',
        color: 'blue',
        icon: <MdInfo/>
      })
    }
    if (!_.isEmpty(hasEdit)) {
      EditProfile(data)
        .then(() => {
          showModal(false)
          notifications.showNotification({
            message: 'Din profil har uppdaterats',
            color: 'green',
            icon: <MdCheck/>
          })
        })
        .catch(() => {
          showModal(false)
          notifications.showNotification({
            title: 'Någåt gick fel..',
            message: 'Vänligen logga in igen',
            color: 'red',
            icon: <MdError/>
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
    <>
      <Group direction="column" style={{ width: '100%' }}>
        <Text p="2em">
          Namn: <Anchor> {user.firstname} {user.lastname} </Anchor>
        </Text>
        <Text>
          Mailadress: <Anchor> {user.email} </Anchor>
        </Text>
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
    </>
  )
}
export default Account
