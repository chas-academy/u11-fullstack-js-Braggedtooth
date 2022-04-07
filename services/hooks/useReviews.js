import { useQuery } from 'react-query'
import useStore from '../../services/hooks/useStore'
import getReviews from '../../services/queries/getReviews'
import getUserReviews from '../../services/queries/getUserReviews'

const useReviews = () => {
  const { isLoggedIn } = useStore().store
  const { data, isLoading } = useQuery('getReviews', () => getReviews(), {
    enabled: isLoggedIn
  })
  const { data: users, isLoading: userLoading } = useQuery('getUserReviews', () => getUserReviews(), {
    enabled: isLoggedIn
  })
  return {
    reviews: data?.data.data,
    isLoading,
    users: users?.data.data,
    userLoading
  }
}

export default useReviews