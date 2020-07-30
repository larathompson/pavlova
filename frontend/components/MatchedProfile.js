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
      <section id="user-tiles">
        <section>
          <article>
            <h3>{matchedUser.first_name}, {getAge(new Date(matchedUser.dob))}</h3>
            <img src={matchedUser.image_1} />
            <h3>{matchedUser.bio}</h3>
          </article>
        </section>
        <div>
          <Link to="/matches"> See your matches </Link>
          <Link to="/images"> Change your profile image </Link>
        </div>
      </section>
    </section>
  </div>

}


export default MatchedProfile
