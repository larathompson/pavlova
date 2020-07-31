import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import Auth from '../lib/auth'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
// import { ProgressPlugin } from 'webpack'

function MatchedProfile(props) {

  const [matchedUser, updateMatchedUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`api/matched/${props.match.params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(axiosResp => {
        updateMatchedUser(axiosResp.data)
      })
  }, [])

  function getAge(dob) {
    const diffMs = Date.now() - dob.getTime()
    const ageDt = new Date(diffMs)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }


  return <div>
    <div>
      <Navbar />
    </div>
    <section id="users">
      <h1>Its a Match!</h1>
      <article>
        <h2>{matchedUser.first_name}</h2>
        <img src={matchedUser.image_1} />
        <h3>{getAge(new Date(matchedUser.dob))} years old</h3>
        <p>{matchedUser.bio}</p>
      </article>
    </section>
  </div>

}


export default MatchedProfile
