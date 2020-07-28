import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Users = () => {
  const [usersData, updateUsersData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(axiosResp => {
        updateUsersData(axiosResp.data)
      })
  }, [])


  if (!usersData.length)
    return <div id="loading-container">
      <h2>Loading...</h2>
    </div>

  return <section id="users">

    <h1>Like or nah</h1>

    <section id="user-tiles">
      {usersData.map((users, index) => {
        return (
          <article key={index}>
            <h3>{usersData[0].first_name}</h3>
          </article>
        )
      })}
    </section>

  </section>

}
