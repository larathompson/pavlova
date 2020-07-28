import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import FadeIn from 'react-fade-in'

const preferencesSchema = Yup.object().shape({
  bio: Yup.string(),
  age_pref_min: Yup.number()
    .required('No minimun age preference set'),
  age_pref_max: Yup.number()
    .required('No minimun age preference set'),
  gender_pref: Yup.string()
    .required('Please select your gender preference'),
  location_distance: Yup.number()
    .required('No minimun age preference set')
})

export const Preferences = () => {

  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(preferencesSchema),
    criteriaMode: 'all'
  })

  const onSubmit = values => {
    axios.post('/api/preferences/user', values)
      .then(() => {
        history.push('/preferences')
      })
      .catch(err => {
        const errorMessages = {
          email: 'That email is already registered. Please log in or register with another email address.'
        }
        Object.keys(err.response.data.errors).forEach(errorField => {
          setError(errorField, { message: `${errorMessages[errorField]}` })
        })
      })

  }
}