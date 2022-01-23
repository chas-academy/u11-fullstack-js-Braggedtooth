import React, { useState } from 'react'
import Container from '../core/Container'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login } from '../../utils/validationschema'
import styles from '../../styles/Login.module.css'
import { MdOutlineEmail, MdPassword } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import classnames from 'classnames'
import { isValid } from 'zod'
import Link from 'next/link'
const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(Login) })
  const onSubmit = (data) => {
    console.log(data)
    console.log(errors)
  }

  const [toggle, setToggle] = useState(true)
  const togglePassword = () => setToggle(!toggle)
  const conStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '20rem',
    height: '25em',
    padding: '2rem',
    borderRadius: ' 0.7rem'

  }
  return (
    <>
      <Container customStyle={conStyle}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className='field'>
            <div className='control has-icons-left has-icons-right'>
              <input className='input' type='email' placeholder='Email' {...register('email')} />
              {errors.email?.message && <p className='help is-danger'>{errors.email.message}</p>}
              <span className='icon is-small is-left'>
                <MdOutlineEmail />
              </span>
            </div>
          </div>
          <div className='field'>
            <div className='control has-icons-left has-icons-right '>
              <input className='input' type={toggle ? 'password' : 'text'} placeholder='Password' {...register('password')} />

              {errors.password?.message && <p className='help is-danger'>{errors.password.message}</p>}
              <span className='icon is-small is-left'>
                <MdPassword />
              </span>
              <span className={classnames({ icon: true, 'is-small': true, ' is-right': true, [styles.clicky]: true })} onClick={() => { togglePassword() }}>
                {!toggle ? <BiHide /> : <BiShow />}
              </span>
            </div>

          </div>
          <button type='submit' className={styles.form_btn}>Login</button>
        </form>
        <p className={styles.register}>Dont have an account? </p>
        <a><Link href="/register">  Sign up</Link></a>
        

      </Container>
    </>
  )
}

export default LoginForm
