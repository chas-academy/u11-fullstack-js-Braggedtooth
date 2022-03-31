import { useMutation } from 'react-query'
import { editProfile, login, logout } from '../lib/auth'
import useStore from './useStore'

const useProfile = () => {
  const { addUserToStore, setAuth } = useStore()
  const { mutateAsync: Login } = useMutation(user => login(user), {
    onSuccess: data => {
      addUserToStore(data.data.data)
      setAuth(true)
    }
  })

  const { mutateAsync: EditProfile } = useMutation(user => {
    addUserToStore(user)
    editProfile(user)
  })
  const { mutateAsync: LogOut } = useMutation(() => logout(), {
    onSuccess: () => {
      setAuth(false)
    }
  })
  return {
    Login,
    LogOut,
    EditProfile
  }
}

export default useProfile
