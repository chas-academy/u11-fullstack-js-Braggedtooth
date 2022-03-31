import { useQuery } from 'react-query'

function getResults () {
  return undefined
}

const useSearch = () => {
  const { data, isLoading } = useQuery('getSearchResult', getResults())

}