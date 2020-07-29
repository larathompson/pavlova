import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
// import moment from 'moment'

export const Users = () => {
  const [usersData, updateUsersData] = useState([])
  const [activeUser, updateActiveUser] = useState(0)
  // const [filterUsers, updateFilterUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('api/preferences/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const currentUser = res.data
        axios.get('api/users', { headers: { Authorization: `Bearer ${token}` } })
          .then(axiosResp => {
            console.log(axiosResp.data)
            console.log(currentUser)
            const genderFilter = axiosResp.data.filter(user => user.gender === currentUser.gender_pref)
            console.log(genderFilter)

            const ageFilter = genderFilter.filter(user =>
              (getAge(new Date(user.dob)) <= currentUser.age_pref_max) &&
              (getAge(new Date(user.dob)) >= currentUser.age_pref_min))
            // console.log(getAge(new Date(currentUser.dob)))
            // console.log(currentUser.age_pref_min)
            // console.log(currentUser.age_pref_max)


            // console.log(ageFilter)


            updateUsersData(ageFilter)



          })
      })

  }, [])

  // useEffect(() => {
  //   updateActiveUser(usersData[0])

  // }, [usersData])


  if (!usersData.length)
    return <div id="loading-container">
      <h2>Loading...</h2>
    </div>



  //   current_datetime = new Date()
  // formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
  // console.log(formatted_date)


  function handleLike(event) {
    console.log(event.target.value)
    axios.post('/api/likes', { liked_id: parseInt(event.target.value) }, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(res => {
        if (res.data === 'Match') {
          console.log('match')
        }
      })
    if (usersData.length - 1 === activeUser) {
      return 
    } else {
      updateActiveUser(activeUser + 1)
    }
  }

  function handleDislike(event) {
    console.log(event.target.value)
    axios.post('/api/dislikes', { disliked_id: parseInt(event.target.value) }, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
    if (usersData.length - 1 === activeUser) {
      return
    } else {
      updateActiveUser(activeUser + 1)
    }
  }

  function getAge(dob) {
    const diffMs = Date.now() - dob.getTime()
    const ageDt = new Date(diffMs)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }


  return <section id="users">

    <h1>Like or nah</h1>

    <section id="user-tiles">
      <section>
        <article>
          <h3>{usersData[activeUser]?.first_name}, {getAge(new Date(usersData[activeUser]?.dob))}</h3>
          {/* <h3>{user.dob}</h3> */}
          {/* {console.log(getAge(new Date(user.dob)))} */}
          <h3>hello</h3>
        </article>
        <div id="buttons">
          <button onClick={handleLike} value={usersData[activeUser]?.id}>Like</button>
          <button onClick={handleDislike} value={usersData[activeUser]?.id}> Dislike</button>
        </div>
      </section>
    </section>

  </section>

}
