import React, { useState } from 'react'
import Container from '../core/Container'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Signup } from '../../utils/validationschema'
import styles from '../../styles/Login.module.scss'
import { MdOutlineEmail, MdPassword, MdPerson, MdPersonAdd } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import classnames from 'classnames'
import Link from 'next/link'
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(Signup) })
  const onSubmit = (data) => {
    console.log(data)
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
            <h1 className='mb-6'>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className='field'>
                <div className='control has-icons-left'>
                  <input className='input' type='firstname' placeholder='Firstname' {...register('firstname')} />
                  {errors.email?.firstname && <p className='help is-danger'>{errors.firstname.message}</p>}
                  <span className='icon is-small is-left'>
                    <MdPerson />
                  </span>
                </div>
              </div>
              <div className='field'>
                <div className='control has-icons-left'>
                  <input className='input' type='lastname' placeholder='Lastname' {...register('lastname')} />
                  {errors.lastname?.message && <p className='help is-danger'>{errors.lastname.message}</p>}
                  <span className='icon is-small is-left'>
                    <MdPersonAdd />
                  </span>
                </div>
              </div>
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
              <button type='submit' className='button is-success is-align-self-flex-end mb-3 mt-2'>Register</button>
            </form>
            <p className='my-4'>Already have an account? </p>
            <a className='button is-warning'><Link href='/login'>Login</Link></a>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Register
