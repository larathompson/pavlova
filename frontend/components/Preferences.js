import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
// import Slider from '@material-ui/core/Slider'
import FadeIn from 'react-fade-in'
import Navbar from './Navbar'

const preferencesSchema = Yup.object().shape({
  bio: Yup.string(),
  age_pref_min: Yup.number(),
  age_pref_max: Yup.number(),
  gender_pref: Yup.string()
  // location_distance: Yup.number()
  //   .required('No distance set')
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
        console.log('what up bitch')
        history.push('/pavlova')
      })
  }

  // const [age_pref_min, setValue] = React.useState(30)

  // const handleChange = (value, newValue) => {
  //   setValue(newValue)
  // }

  return (
    <div>
      <Navbar />
      <section id="preferences">

        <FadeIn>
          <form onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="bio">Enter your last name</label><br></br>
            <input id="bio" type="text" name="bio" autoComplete="off" placeholder="Edit your bio" ref={register} />

            <label htmlFor="age_pref_min">Enter your minimum age preferences</label><br></br>
            <input id="age_pref_min" type="number" name="age_pref_min" autoComplete="off" placeholder="18" ref={register} />
            {/* <label htmlFor="age_pref_min">Set your minimum age preference</label><br></br>
            <Slider id="age_pref_min" min={18} max={70} onChange={handleChange} value={age_pref_min} /> */}

            <button type="submit">Save changes</button>

          </form>
        </FadeIn>
      </section>
    </div>

  )
}