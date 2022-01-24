import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import Container from './Container'
import { MdPersonSearch } from 'react-icons/md'
import { useForm } from 'react-hook-form'

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [querry, SetQuerry] = useState()

  const submit = (data) => {
    SetQuerry(data.query)
    console.log(data)
    alert('your searched for: ' + data.query)
  }
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [querry])

  return (
    <Container customStyle={{ alignItems: 'stretch', width: '80%', marginBottom: '2rem', marginTop: '2rem' }}>
      <div className={classNames({ 'control is-medium is-hovered has-icons-left': true, 'is-loading ': loading })}>
        <form onSubmit={handleSubmit(submit)}>
          <input className='input is-rounded ' type='text' placeholder='Sök Mäklare' {...register('query', { onChange: (e) => SetQuerry(e.target.value) })} />
        </form>
        <span className=' icon is-left'><MdPersonSearch /></span>
      </div>
    </Container>
  )
}

export default Search
