import { useStateMachine } from 'little-state-machine'

import {
  removeUser,
  storeUser,
  toggleAuthState,
  setToken
} from '../lib/actions'

const useStore = () => {
  const { actions } = useStateMachine({
    storeUser,
    removeUser,
    toggleAuthState,
    setToken
  })
  const { state } = useStateMachine()
  const addUserToStore = (user) => {
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
    return actions.setToken('')
  }
  const storeToken = (token) => {
    return actions.setToken(token)
  }

  return {
    store: state,
    addUserToStore,
    setAuth,
    logout,
    storeToken,
    removeUserFromStore
  }
}

export default useStore
