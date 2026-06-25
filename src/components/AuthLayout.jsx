import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import {useNavigate} from 'react-router-dom'
import Loading from './Loading';

function AuthLayout({children,authentication}) {
    const{user,authLoading,fetchUserData}=useAuth()
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            fetchUserData()
        }
    },[])

    useEffect(()=>{
        if(authLoading)return;
        if(authentication && !user)navigate('/login')
        else if(!authentication && user)navigate('/dashboard')    

    },[user,authentication,authLoading])

  return  authLoading?<Loading/>:children
    
  
}

export default AuthLayout