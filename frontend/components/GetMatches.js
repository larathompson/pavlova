import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
// import Auth from '../lib/auth'
// import { getAge } from './GetUsers'

export const GetMatches = () => {
  const [matches, updateMatches] = useState([])
  console.log('this is the matches')
  console.log(matches)
  console.log('this is the mathces')

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('api/matches', { headers: { Authorization: `Bearer ${token}` } })
      .then(axiosResp => {
        updateMatches(axiosResp.data)
        console.log(axiosResp.data)

      })
  }, [])

  function getAge(dob) {
    const diffMs = Date.now() - dob.getTime()
    const ageDt = new Date(diffMs)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }



  return <div>
    <Navbar />
    <div id="get-match">
      <h2>You have {matches.length} matches</h2>
      <section id="matches">
        {0 === matches.length ?
          <h2>Keep swiping!</h2>
          :
          matches.map((match, index) => {
            return <div id="single-match" key={index}>

              <Link to={`/user/${match.id}`}>
                < img src={match.image_1} />
              </Link>
              <h3>{match.first_name}</h3>
              {/* <h3>{getAge(new Date(match.dob))}</h3> */}

            </div>
          })}
      </section>
    </div>
  </div >

}
