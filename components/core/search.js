import { Input, InputWrapper, Tooltip } from '@mantine/core'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdPersonSearch } from 'react-icons/md'
import Container from './Container'

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [query, SetQuery] = useState()
  console.log(errors)
  const submit = (data) => {
    SetQuery(data.query)
    console.log(data)
  }
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [query])

  const rightSection = (
    <Tooltip label="We do not send spam" position="top" placement="end">
      <MdPersonSearch size={16} style={{ display: 'block', opacity: 0.5 }}/>
    </Tooltip>
  )

  return (
    <Container customStyle={{ alignItems: 'stretch', width: '80%', marginBottom: '2rem', marginTop: '2rem' }}>
      <div className={classNames({ 'control is-medium is-hovered has-icons-left': true, 'is-loading ': loading })}>
        <form onSubmit={handleSubmit(submit)}>
          <InputWrapper
            error={!isEmpty(errors) && 'något gick fel...'}
          >
            <Input
              placeholder="Sök Mäklare"
              rightSection={rightSection} {...register('query', { onChange: (e) => SetQuery(e.target.value) })}
            />
          </InputWrapper>

        </form>
      </div>
    </Container>
  )
}

export default Search
