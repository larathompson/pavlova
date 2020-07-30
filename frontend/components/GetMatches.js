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
    <div>
      <main className="matches">
        <h2>You have {matches.length} matches</h2>
        {0 === matches.length ?
          <h3>Keep swiping!</h3>
          :
          matches.map((match, index) => {
            return <div id="singleMatch" key={index}>
              <Link to={`/matched/${match.id}`}>
                <div id="user-tiles">
                  <h3>{match.first_name}</h3>
                  <h3>{getAge(new Date(match.dob))}</h3>
                  < img src={match.image_1} />
                </div>
              </Link>
            </div>
          })}
      </main>
    </div>
  </div >

}
