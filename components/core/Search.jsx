import { Input, InputWrapper, Loader, Container } from '@mantine/core'
import { isEmpty } from 'lodash'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdPersonSearch } from 'react-icons/md'
import useDebounce from '../../services/hooks/useDebouce'
import useSearch from '../../services/hooks/useSearch'
import Results from './Results'

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
    <MdPersonSearch size={24} style={{ display: 'block', opacity: 0.5 }} />
  )

  return (
    <Container
      style={{
        alignItems: 'stretch',
        width: '80%',
        marginBottom: '5rem',
        marginTop: '2rem',
        padding: 0
      }}
    >
      <form onSubmit={handleSubmit(submit)}>
        <InputWrapper
          loading={isLoading.toString()}
          error={!isEmpty(errors) && 'något gick fel...'}
        >
          <Input
            autoFocus
            placeholder="Sök Mäklare"
            rightSection={
              !isLoading ? rightSection : <Loader variant="oval" p={6} />
            }
            {...register('query', {
              onChange: (e) => setQuery(e.target.value)
            })}
          />
        </InputWrapper>
      </form>
      <Results data={result} />
    </Container>
  )
}

export default Search
