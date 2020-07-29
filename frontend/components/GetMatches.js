import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

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

      })
  }, [])

  return <main className="matches">
    {matches.map((match, index) => {
      return <div className="singleMatch" key={index}>
        <h3>{match.first_name}</h3>
        <h3>{match.dob}</h3>
        <img src={match.image_1}/>
        
      </div>
    })}
  </main>
}

