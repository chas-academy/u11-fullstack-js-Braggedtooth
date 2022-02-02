import { Anchor, Button, Modal, TextInput, Text, Group } from '@mantine/core'
import useUser from '../services/hooks/useUser'
import { useState } from 'react'
import { getChangedProps } from '../services/lib/actions'
import { useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { MdCheck, MdError, MdInfo } from 'react-icons/md'
import _ from 'lodash'
import { editProfile } from '../services/lib/auth'

const Account = () => {
  const { user, addUserToStore } = useUser()
  const [edit, setEdit] = useState(false)
  const [modal, showModal] = useState(false)
  const notifications = useNotifications()
  const onSave = data => {
    data.role = 'USER'
    const hasEdit = getChangedProps(user, data)
    if (_.isEmpty(hasEdit)) {
      notifications.showNotification({
        message: 'Profile information unchanged',
        color: 'blue',
        icon: <MdInfo />
      })
    }
    if (!_.isEmpty(hasEdit)) {
      editProfile(data)
        .then(res => {
          addUserToStore(data)
          notifications.showNotification({
            message: res.data.message,
            color: 'green',
            icon: <MdCheck />
          })
        })
        .catch(error => {
          const err = error.response.data
          notifications.showNotification({
            title: error.response.status,
            message: err.error.message,
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
    <>
      <Group direction='column' style={{ padding: '2em' }}>
        <Text padding='2em' color='lime'>
          Förnamn: <Anchor> {user.firstname} </Anchor>
        </Text>
        <Text>
          Efternamn: <Anchor> {user.lastname} </Anchor>
        </Text>
        <Text>
          Mailadress: <Anchor> {user.email} </Anchor>
        </Text>
      </Group>
      <Button
        my='md'
        onClick={() => {
          showModal(true)
          setEdit(!edit)
        }}
      >
        Redigera
      </Button>
      {modal && (
        <Modal opened={modal} centered onClose={() => showModal(false)}>
          <form onSubmit={form.onSubmit(onSave)}>
            <TextInput
              placeholder={user.firstname}
              label='Förnamn'
              {...form.getInputProps('firstname')}
            />
            <TextInput
              placeholder={user.lastname}
              label='Efternamn'
              {...form.getInputProps('lastname')}
            />
            <TextInput
              placeholder={user.email}
              label='Mailaddress'
              {...form.getInputProps('email')}
            />
            <Button type='submit' color='green' my='md'>
              Spara
            </Button>
          </form>
        </Modal>
      )}
    </>
  )
}
export default Account
