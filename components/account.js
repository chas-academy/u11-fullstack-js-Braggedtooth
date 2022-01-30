import { Button, TextInput } from '@mantine/core'
import _ from 'lodash'
import useUser from '../services/hooks/useUser'
import { useState } from 'react'

const Account = () => {
  const { user } = useUser()
  const [edit, setEdit] = useState(false)

  return (
    <>
      <TextInput
        placeholder={user.firstname}
        disabled={!edit && true}
        label='Förnamn'
      />
      <TextInput
        placeholder={user.lastname}
        disabled={!edit && true}
        label='Efternamn'
      />
      <TextInput
        placeholder={user.email}
        disabled={!edit && true}
        label='MailAddress'
      />
      <Button onClick={() => setEdit(!edit)}>Edit</Button>
      {edit && <Button color='green'>Save</Button>}
    </>
  )
}
export default Account
