import { useState } from 'react'
import { useQuery } from 'react-query'
import { capitalize } from '../lib/helpers'
import searchRealtor from '../queries/searchRealtor'

const useSearch = () => {
  const [filter, setFilter] = useState('')

  const { data, isLoading } = useQuery(
    'getSearchResult',
    () => searchRealtor(capitalize(filter)),
    {
      enabled: Boolean(filter)
    }
  )
  return {
    search: setFilter,
    result: data?.data,
    isLoading
  }
}

export default useSearch