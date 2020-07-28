import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
// import moment from 'moment'

export const Users = () => {
  const [usersData, updateUsersData] = useState([])
  // const [filterUsers, updateFilterUsers] = useState([])

  console.log(usersData)
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(axiosResp => {
        updateUsersData(axiosResp.data)
        // updateFilterUsers(axiosResp)
        // console.log(usersData)
        //  console.log(filterUsers)
        // console.log(usersData)
      })
  }, [])


  if (!usersData.length)
    return <div id="loading-container">
      <h2>Loading...</h2>
    </div>



  //   current_datetime = new Date()
  // formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
  // console.log(formatted_date)


  function handleLike(event) {
    console.log(event.target.value)
    axios.post('/api/likes', { liked_id: parseInt(event.target.value) },  { headers: { Authorization: `Bearer ${Auth.getToken() }` } } )
      .then(res => {
        if (res.data === 'Match') {
          console.log('match')
        }
      })
  }

  function handleDislike(event) {
    console.log(event.target.value)
    axios.post('/api/dislikes', { disliked_id: parseInt(event.target.value) },  { headers: { Authorization: `Bearer ${Auth.getToken() }` } } )
  }

  function getAge(dob) {
    const diffMs = Date.now() - dob.getTime()
    const ageDt = new Date(diffMs)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }


  return <section id="users">

    <h1>Like or nah</h1>

    <section id="user-tiles">
      {usersData.map((user, index) => {
        return (
          <section key={index}>
            <article key={index}>
              <h3>{user.first_name}, {getAge(new Date(user.dob))}</h3> 
              {/* <h3>{user.dob}</h3> */}
              {/* {console.log(getAge(new Date(user.dob)))} */}
              <h3>hello</h3>
            </article>
            <div id="buttons">
              <button onClick={handleLike} value={user.id}>Like</button>
              <button onClick={handleDislike} value={user.id}> Dislike</button>
            </div>
          </section>


        )
      })}
    </section>

  </section>

}
