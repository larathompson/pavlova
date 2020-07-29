import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import Slider from '@material-ui/core/Slider'
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
    .required('No distance set')
})

export const Preferences = () => {

  const history = useHistory()
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(preferencesSchema),
    criteriaMode: 'all'
  })

  const onSubmit = values => {
    axios.put('/api/preferences/user', values)
      .then(() => {
        history.push('/preferences')
      })
  }

  const [value, setValue] = React.useState(30)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <section id="login">
      <FadeIn>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="age_pref_min">Set your minimum age preference</label><br></br>
          <Slider min={18} max={70} onChange={handleChange} value={value} />

          <label htmlFor="first_name">Enter your first name</label><br></br>
          <input id="first_name" type="text" name="first_name" autoComplete="off" placeholder="First name" ref={register} />

          <label htmlFor="last_name">Enter your last name</label><br></br>
          <input id="last_name" type="text" name="last_name" autoComplete="off" placeholder="Last name" ref={register} />

          <button type="submit">Save changes</button>
          <Link to='/pavlova'>
            <button>Cancel</button>
          </Link>

        </form>
      </FadeIn>
    </section>
  )
}




