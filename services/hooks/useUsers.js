import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  getAllUsers,
  addUsers,
  banUser,
  changeRole,
  deleteUser,
  activateUser
} from '../queries/users'

const useUSers = () => {
  const client = useQueryClient()
  const addUser = useMutation((data) => addUsers(data), {
    onSuccess: () => client.invalidateQueries('getUsers')
  })
  const deleteUserbyId = useMutation((data) => deleteUser(data), {
    onSuccess: () => client.invalidateQueries('getUsers')
  })

  const banUserbyId = useMutation((data) => banUser(data), {
    onSuccess: () => client.invalidateQueries('getUsers')
  })
  const changeUserRole = useMutation((data) => changeRole(data), {
    onSuccess: () => client.invalidateQueries('getUsers')
  })
  const activateUserById = useMutation((data) => activateUser(data), {
    onSuccess: () => client.invalidateQueries('getUsers')
  })

  const { data, isLoading, isError } = useQuery(
    'getUsers',
    () => getAllUsers(),
    {
      refetchInterval: false
    }
  )
  return {
    users: data?.data.users,
    isError,
    addUser,
    deleteUserbyId,
    banUserbyId,
    activateUserById,
    changeUserRole,
    isLoading
  }
}

export default useUSers
