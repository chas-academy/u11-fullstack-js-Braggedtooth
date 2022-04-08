import { useStateMachine } from 'little-state-machine'
import { useRouter } from 'next/router'

import { removeUser, storeUser, toggleAuthState } from '../lib/actions'
import { logOut } from '../lib/auth'

const useStore = () => {

  const router = useRouter()
  const { actions } = useStateMachine({ storeUser, removeUser, toggleAuthState })
  const { state } = useStateMachine()
  const addUserToStore = user => {
    return actions.storeUser(user)
  }
  const removeUserFromStore = () => {
    return actions.removeUser('')
  }
  const setAuth = (value) => {
    return actions.toggleAuthState(value)
  }
  const logout = () => {
    actions.removeUser('')
    return logOut().then(() => router.push('/logga-in'))
  }

  return {
    store: state,
    addUserToStore,
    setAuth,
    logout,
    removeUserFromStore
  }
}

export default useStore
