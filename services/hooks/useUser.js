import { useStateMachine } from 'little-state-machine'
import { storeUser, removeUser } from '../lib/actions'

const useUser = () => {
  const { actions } = useStateMachine({ storeUser, removeUser })
  const { state } = useStateMachine()
  const user = state.user
  const addUserToStore = user => {
    return actions.storeUser(user)
  }
  const removeUserFromStore = () => {
    return actions.removeUser()
  }

  return {
    user,
    addUserToStore,
    removeUserFromStore
  }
}

export default useUser
