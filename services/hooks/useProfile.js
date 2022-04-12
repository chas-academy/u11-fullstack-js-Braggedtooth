import { useMutation } from 'react-query'
import { editProfile, login } from '../lib/auth'
import useStore from './useStore'

const useProfile = () => {
  const { addUserToStore, setAuth, logout,storeToken } = useStore()
  const { mutateAsync: Login } = useMutation(user => login(user), {
    onSuccess: data => {
    addUserToStore(data.data.data) 
    storeToken(data.data.token)
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
      logout()
    }
  })
  return {
    Login,
    LogOut,
    EditProfile
  }
}

export default useProfile
