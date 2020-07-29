import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import splashLogo from '../assets/logo-with-text-dark-pink.png'
// import { UserContext } from './Context' ! REMEMBER TO IMPORT CONTEXT


export const Splashscreen = () => {

  // const { currentUser } = useContext(UserContext)

  return (
    <FadeIn delay="200" >
      <section id="splashscreen">
        <div className="splash-photo">
          <img src={splashLogo} />
        </div>
        <div className="splash-content">
          <p>{"Your dating life doesn't have to be a palaver!"}</p>
          <p>Let Pavlova find you a PavLover</p>
          <Link to='/login'>
            <button>Log in to Pavlova</button>
          </Link>
          <Link to='/register'>Not registered? Click here.</Link>
        </div>
      </section>
    </FadeIn>
  )
}