import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import styles from '../styles/Login.module.css'
const TestBeer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    console.log(errors)
  }
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <label className={styles.input_label} htmlFor='email'>Email</label>
      <input className={styles.form_input} type='email' name='email' {...register('email')} />
      {errors.email?.message && <p className={styles.error}>{errors.email.message}</p>}
      <label className={styles.input_label} htmlFor='password'>Password</label>
      <input type={toggle ? 'password' : 'text'} name='password' className={styles.form_input} {...register('password')} />
      {errors.password?.message && <p className={styles.error}>{errors.password.message}</p>}

    </>
  )
}
export default TestBeer
