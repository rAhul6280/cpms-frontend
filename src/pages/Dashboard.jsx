import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import Loading from '../components/Loading'

function Dashboard() {

  

   const {authLoading,user,fetchUserData}=useAuth()

   useEffect(()=>{
    console.log(user);
   },[user])
  return authLoading?(<Loading/>): (
    <div>
      Welcome! to dashboard
      {user.fullName}
      {user.email}
      {user.role}
    </div>
  )
}

export default Dashboard