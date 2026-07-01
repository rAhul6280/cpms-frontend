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
    <div className='relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100'>
   
    <NavBar/>
    <Outlet/>
    </div>    
  )
}

export default Layout