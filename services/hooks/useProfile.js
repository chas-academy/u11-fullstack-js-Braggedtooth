import { useMutation, useQuery } from 'react-query'
import { login } from 'services/lib/auth'

const useProfile = () => {
  const { mutate } = useMutation(user => login(user))
  return {
    LOGIN: mutate
  }
}

export default useProfile
