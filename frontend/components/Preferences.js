import React, { useEffect } from 'react'
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
    const token = localStorage.getItem('token')
    axios.put('/api/preferences/user', values, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        console.log('what up')
        history.push('/pavlova')
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('api/preferences/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const currentUser = res.data

  // const [age_pref_min, setValue] = React.useState(30)

  // const handleChange = (value, newValue) => {
  //   setValue(newValue)
  // }

  return (
    <div>
      <Navbar />
      <section id="preferences">

        <FadeIn>
          <div id="user-pref">
            
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="bio">Enter your last name</label><br></br>
            <input id="bio" type="text" name="bio" autoComplete="off" placeholder="Edit your bio" ref={register} />

            <label htmlFor="age_pref_min">Enter your minimum age preference</label><br></br>
            <input id="age_pref_min" type="number" name="age_pref_min" autoComplete="off" placeholder="18" ref={register} />

            <label htmlFor="age_pref_max">Enter your maximum age preference</label><br></br>
            <input id="age_pref_max" type="number" name="age_pref_max" autoComplete="off" placeholder="70" ref={register} />

            <label htmlFor="gender_pref">What are you looking for?</label><br></br>
            <select name="gender_pref" ref={register}>
              <option value="male">Men</option>
              <option value="female">Women</option>
              <option value="both">Everyone</option>
            </select>

            <button type="submit">Save changes</button>

          </form>
        </FadeIn>
      </section>
    </div>

  )
}

{/* <label htmlFor="age_pref_min">Set your minimum age preference</label><br></br>
            <Slider id="age_pref_min" min={18} max={70} onChange={handleChange} value={age_pref_min} /> */}