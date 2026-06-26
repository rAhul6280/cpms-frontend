import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigation } from 'react-router-dom'
import Loading from './Loading'
import {ToastContainer}from 'react-toastify'
import NavBar from './NavBar'

function Layout() {
    const navigation=useNavigation()

    const isLoading = navigation.state==='loading'

  return isLoading?<Loading/>: (
    <div className=' relative '>
   
    <NavBar/>
    <Outlet/>
    </div>    
  )
}

export default Layout