import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as Yup from 'yup'
import axios from 'axios'
import FadeIn from 'react-fade-in'
// import TextField from '@material-ui/core/TextField'

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required('No email address provided'),
  first_name: Yup.string()
    .required('Please enter your first name'),
  last_name: Yup.string()
    .required('Please enter your last name'),
  gender: Yup.string()
    .required('Please select your gender'),
  gender_pref: Yup.string()
    .required('Please select your gender preference'),
  dob: Yup.date()
    .required('Please enter your date of birth'),
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/,
      'Must Contain 8 Characters, one uppercase, one lowercase and one number'
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')

})

export const Register = () => {

  const history = useHistory()
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(registerSchema),
    criteriaMode: 'all'
  })

  const onSubmit = values => {
    axios.post('/api/register', values)
      .then(() => {
        history.push('/login')
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

  return (
    <section id="register">
      <FadeIn delay="200">
        <h1>Welcome to Pavlova</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* <TextField
            name="email"
            inputRef={register}
            type="text"
            label="Email Address"
            variant="outlined"
            // autoComplete="nope"
            error={errors.email?.message}
          />

          <br></br>
          <br></br>

          <TextField
            name="first_name"
            inputRef={register}
            type="text"
            label="First Name"
            variant="outlined"
            autoComplete="nope"
            error={errors.first_name?.message}
          />

          <br></br>
          <br></br>

          <TextField
            name="last_name"
            inputRef={register}
            type="text"
            label="Last Name"
            variant="outlined"
            autoComplete="nope"
            error={errors.last_name?.message}
          />

          <br></br>
          <br></br>

          <TextField
            name="dob"
            label="Date of Birth"
            type="date"
            inputRef={register}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            error={errors.dob?.message}
          />

          <br></br>
          <br></br>

          <TextField
            name="password"
            inputRef={register}
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="nope"
            error={errors.password?.message}
          />

          <br></br>
          <br></br>

          <TextField
            name="password_confirmation"
            inputRef={register}
            label="Confirm Password"
            type="password"
            variant="outlined"
            autoComplete="nope"
            error={errors.password_confirmation?.message}
          /> */}

          <label htmlFor="email">Enter your email address</label><br></br>
          <input id="email" type="email" name="email" autoComplete="off" placeholder="Email address" ref={register} />
          <p>{errors.email?.message}</p>    

          <label htmlFor="first_name">Enter your first name</label><br></br>
          <input id="first_name" type="text" name="first_name" autoComplete="off" placeholder="First name" ref={register} />
          <p>{errors.first_name?.message}</p>    

          <label htmlFor="last_name">Enter your last name</label><br></br>
          <input id="last_name" type="text" name="last_name" autoComplete="off" placeholder="Last name" ref={register} />
          <p>{errors.last_name?.message}</p>

          <label htmlFor="gender">Select your gender</label><br></br>
          <select name="gender" ref={register}>
            {/* <option value="" disabled selected hidden>Select gender</option> */}
            <option value="" disabled defaultValue hidden>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p>{errors.gender?.message}</p>

          <label htmlFor="gender_pref">What are you looking for?</label><br></br>
          <select name="gender_pref" ref={register}>
            <option value="male">Men</option>
            <option value="female">Women</option>
          </select>
          <p>{errors.gender_pref?.message}</p>

          <label htmlFor="dob">Enter your date of birth</label><br></br>
          <input id="dob" type="date" name="dob" ref={register} />
          <p>{errors.dob?.message}</p>

          <label htmlFor="password">Choose a password</label><br></br>
          <input id="password" type="password" name="password" autoComplete="off" placeholder="Password" ref={register} />
          <p>{errors.password?.message}</p>

          <label htmlFor="passswordConfirmation">Confirm your password</label><br></br>
          <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirm password" autoComplete="off" ref={register} />
          <p>{errors.password_confirmation?.message}</p>

          <br></br>
          <br></br>

          <button type="submit">Submit</button>


        </form>
      </FadeIn>
    </section>
  )


}

