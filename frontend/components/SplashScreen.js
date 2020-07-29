import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in'
// import { UserContext } from './Context' ! REMEMBER TO IMPORT CONTEXT


export const Splashscreen = () => {

  // const { currentUser } = useContext(UserContext)

  return (
    <FadeIn>
      <section id="splashscreen">
        <div className="splash-photo">
        </div>
        <div className="splash-content">
          <h1>Pavlova</h1>
          <p>{"Your dating life doesn't have to be a palaver!"}</p>
          <p>Let Pavlova find you a PavLover</p>
          <Link to='/login'>
            <button>Log in to Pavlova</button>
          </Link>
          <br></br>
          <Link to='/register'>Not registered? Click here.</Link>
        </div>
      </section>
    </FadeIn>
  )
}