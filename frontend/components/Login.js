import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
// import { UserContext } from './Context' ! Remember to import useContext
import FadeIn from 'react-fade-in'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('No email provided'),
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    )
})

export const Login = () => {

  // const { logIn } = useContext(UserContext)
  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(loginSchema),
    criteriaMode: 'all'
  })

  const onSubmit = values => {
    axios.post('/api/login', values)
      .then(() => {
        // logIn(response.data)
        history.push('/pavlova')
      })
      .catch(err => {
        const errorMessages = {
          email: 'Email address not found.',
          password: 'Incorrect password'
        }
        Object.keys(err.response.data).forEach(errorField => {
          setError(errorField, { message: `${errorMessages[errorField]}` })
        })
      })
  }

  return (
    <section id="login">
      <FadeIn>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Enter email</label><br></br>
          <input id="email" type="text" name="email" autoComplete="off" placeholder="Email address" ref={register} />
          <p>{errors.email?.message}</p>
          <label htmlFor="password">Enter your password</label><br></br>
          <input id="password" type="password" name="password" autoComplete="off" placeholder="Password" ref={register} />
          <p>{errors.password?.message}</p>
          <button type="submit">Submit</button>
        </form>
      </FadeIn>
    </section>
  )
}