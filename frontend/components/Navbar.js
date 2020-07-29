import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo-with-text-light-pink.png'

function NavBar() {

  const pathname = useLocation().pathname

  if (pathname === '/') return null

  return <nav id="navbar" role="navigation" aria-label="main">
    <Link to="/pavlova"><img className="logo" src={logo} alt="loading" /></Link>
    <ul>
      <li className="nav-btn"><Link to="/preferences">Edit Profile</Link></li>
      <li className="nav-btn"><Link to="/matches">My Matches</Link></li>
      <li className="nav-btn"><Link to="/">Logout</Link></li>
    </ul>
  </nav >
}

export default NavBar

