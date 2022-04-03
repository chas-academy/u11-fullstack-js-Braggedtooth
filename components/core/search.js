import { Input, InputWrapper, Loader, Tooltip } from '@mantine/core'
import { isEmpty } from 'lodash'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdPersonSearch } from 'react-icons/md'
import Results from '../../components/core/Results'
import useDebounce from '../../services/hooks/useDebouce'
import useSearch from '../../services/hooks/useSearch'
import Container from './Container'

const Search = () => {
  const { search, isLoading, result } = useSearch()
  const [query, setQuery] = useState()
  const debounced = useDebounce(query, 500)

  useEffect(() => {

    return search(debounced)

  }, [debounced, search])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submit = (data) => {
    search(data.query)
  }
  const rightSection = (
    <Tooltip label="We do not send spam" position="top" placement="end">
      <MdPersonSearch size={16} style={{ display: 'block', opacity: 0.5 }}/>
    </Tooltip>
  )

  return (
    <Container customStyle={{ alignItems: 'stretch', width: '80%', marginBottom: '2rem', marginTop: '2rem' }}>
      <form onSubmit={handleSubmit(submit)}>
        <InputWrapper
          loading={isLoading.toString()}
          error={!isEmpty(errors) && 'något gick fel...'}
        >
          <Input
            autoFocus
            placeholder="Sök Mäklare"
            rightSection={!isLoading ? rightSection : <Loader
              variant="dots"/>} {...register('query', { onChange: (e) => setQuery(e.target.value) })}
          />
        </InputWrapper>

      </form>
      <Results data={result}/>
    </Container>
  )
}

export default Search
