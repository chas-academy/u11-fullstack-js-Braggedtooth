import React, { useState } from 'react'
import Container from '../core/Container'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login } from '../../utils/validationschema'
import styles from '../../styles/Login.module.scss'
import { MdOutlineEmail, MdPassword } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import classnames from 'classnames'
import Link from 'next/link'
import { login } from '../../services/lib/auth'
import { useRouter } from 'next/router'
import useUser from '../../services/hooks/useUser'
import { useNotifications } from '@mantine/notifications'
const OldForm = () => {
  const router = useRouter()
  const { mutate } = useUser()
  const notifications = useNotifications()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(Login) })
  const [state, setState] = useState(false)

  const onSubmit = data => {
    setState(true)
    login(data)
      .then(res => {
        console.log(res.data)
        notifications.showNotification({
          title: res.data.message
        })
      })
      .then(mutate())
      .finally(() => {
        setState(false)
        router.push('/')
      })
  }

  const [toggle, setToggle] = useState(true)
  const togglePassword = () => setToggle(!toggle)
  const conStyle = {
    padding: '2rem'
  }
  return (
    <>
      <div className='card'>
        <div className='card-content'>
          <Container customStyle={conStyle}>
            <h1 className='mb-6 has-text-centered has-text-black-ter '>
              Inloggning
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className='field'>
                <div className='control has-icons-left has-icons-right'>
                  <input
                    className='input'
                    type='email'
                    placeholder='E-post'
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <p className='help is-danger'>{errors.email.message}</p>
                  )}
                  <span className='icon is-small is-left'>
                    <MdOutlineEmail />
                  </span>
                </div>
              </div>
              <div className='field'>
                <div className='control has-icons-left has-icons-right '>
                  <input
                    className='input'
                    type={toggle ? 'password' : 'text'}
                    placeholder='Lösenord'
                    {...register('password')}
                  />

                  {errors.password?.message && (
                    <p className='help is-danger'>{errors.password.message}</p>
                  )}
                  <span className='icon is-small is-left'>
                    <MdPassword />
                  </span>
                  <span
                    className={classnames({
                      icon: true,
                      'is-small': true,
                      ' is-right': true,
                      [styles.clicky]: true
                    })}
                    onClick={() => {
                      togglePassword()
                    }}
                  >
                    {!toggle ? <BiHide /> : <BiShow />}
                  </span>
                </div>
              </div>
              <button
                type='submit'
                className={classnames({
                  'button has-text-grey-light  mb-3 mt-2 has-background-black-ter is-hover': true,
                  'is-loading': state
                })}
              >
                Logga in
              </button>
            </form>

            <h5 className='has-text-centered my-2 has-text-black '>
              Inget Konto?{' '}
              <Link href='/register'>
                <a className='has-text-weight-bold is-underlined '>
                  {' '}
                  Registera dig
                </a>
              </Link>
            </h5>
          </Container>
        </div>
      </div>
    </>
  )
}

export default OldForm
