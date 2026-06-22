import React, { useRef, useState } from 'react'
import Input from '../components/Input'

function Signup() {
  const  ref=useRef()
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleChange=(e)=>{
    const {value,name}=e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }

  return (
    <>
      
    <div className='w-full flex flex-col items-center  '>
      <h1 className='text-center'>Create A New Account</h1>
      <div className='sm:w-1/2 w-full flex items-center  flex-col gap-2 ' >

         <Input
          placeholder={"Full Name"} 
          value={formData.fullName}
          onChange={handleChange}
          ref={ref}
          name={"fullName"}
         />
         <Input
          placeholder={"email"} 
          value={formData.email}
          onChange={handleChange}
          ref={ref}
          name={"email"}
         />
         <Input
          placeholder={"password"} 
          value={formData.password}
          onChange={handleChange}
          ref={ref}
          name={"password"}
         />
         <Input
          placeholder={"retype-password"} 
          value={formData.confirmPassword}
          onChange={handleChange}
          ref={ref}
          name={"confirmPassword"}
         />

      </div>
    </div>
    </>
  )
}

export default Signup