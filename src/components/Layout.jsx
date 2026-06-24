import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigation } from 'react-router-dom'
import Loading from './Loading'
import {ToastContainer}from 'react-toastify'

function Layout() {
    const navigation=useNavigation()

    const isLoading = navigation.state==='loading'

  return isLoading?<Loading/>: (
    <>
    <ToastContainer 
    position='bottom-right'
    />
    <Outlet/>
    </>    
  )
}

export default Layout