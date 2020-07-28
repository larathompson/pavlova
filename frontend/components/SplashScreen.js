import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from 'react-fade-in'
// import { UserContext } from './Context' ! REMEMBER TO IMPORT CONTEXT


export const Splashscreen = () => {

  // const { currentUser } = useContext(UserContext)

  return (
    <FadeIn>
      <section id="splashscreen">
        <div className="buttons">
          <h1>Pavlova</h1>
          <p>A dating app for all</p>
          {/* {!currentUser.isLoggedIn && <> */}
          <Link to='/login'>
            <button>Log in to Pavlova</button>
          </Link>
          <br></br>
          <Link to='/register'>Not registered? Click here.</Link>
          {/* </>} */}
        </div>
      </section>
    </FadeIn>
  )
}