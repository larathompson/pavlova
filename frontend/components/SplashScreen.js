import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in'
import splashLogo from '../assets/pav-logo.png'
// import { UserContext } from './Context' ! REMEMBER TO IMPORT CONTEXT


export const Splashscreen = () => {

  // const { currentUser } = useContext(UserContext)

  return (
    <FadeIn delay="200" >
      <section id="splashscreen">
        <h3>Pavlova</h3>
        <div className="splash-photo">
          <img src={splashLogo} />
        </div>
        <div className="splash-content">
          <p>{"Your dating life doesn't have to be a palaver!"}</p>
          <p>Let Pavlova find you a PavLover!</p>
          <Link className="login-btn" to='/login'>
            <button>Log In</button>
          </Link>
          <Link to='/register'><button>Sign Up</button></Link>
        </div>
      </section>
    </FadeIn>
  )
}