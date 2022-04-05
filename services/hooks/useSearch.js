import { useState } from 'react'
import { useQuery } from 'react-query'
import { capitalizeString } from '../lib/helpers'
import searchRealtor from '../queries/searchRealtor'

const useSearch = () => {
  const [filter, setFilter] = useState('')

  const { data, isLoading } = useQuery('getSearchResult', () => searchRealtor(capitalizeString(filter)), {
    enabled: Boolean(filter),

  })
  return {
    search: setFilter,
    result: data?.data,
    isLoading
  }
}

export default useSearch