import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import loadingGif from '../assets/wildie.png'

export const NavBar = () => {

  const pathname = useLocation().pathname

  if (pathname === '/') return null

  return <nav id="navbar" role="navigation" aria-label="main">
    <Link to="/home"><img className="logo" src={loadingGif} alt="loading" /></Link>
    <ul>
      <li className="nav-btn"><Link to="/preferences">Explore</Link></li>
        <>
          <li className="nav-btn"><Link to="/account">Account</Link></li>
          <li className="nav-btn" onClick={logOut}><Link to="/">Logout</Link></li>
        </> :
        <>
          <li className="nav-btn"><Link to="/login">Login</Link></li>
          <li className="nav-btn"><Link to="/register">Register</Link></li>
        </>
      }
    </ul>

  </nav>

}