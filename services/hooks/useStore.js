import { useStateMachine } from 'little-state-machine'
import { removeUser, storeUser, toggleAuthState } from '../lib/actions'

const useStore = () => {
  // const { data } = useQuery('getUser', () => getUser(), {
  // onError: (err) => console.log(err)
  //})
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
    return actions.removeUser('')
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
