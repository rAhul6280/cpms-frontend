import React, { useRef, useState } from 'react'
import Input from '../components/Input'
import {FaUserGraduate,FaUserTie}from 'react-icons/fa6'

function Signup() {
  const  ref=useRef()
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:"",
    role:"student"
  })

  const handleChange=(e)=>{
    const {value,name}=e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }

  return (
    < div className='w-full flex   '>
      {/* container div  */}
    <div className='w-1/2 flex flex-col items-center py-16  px-10 '>
      {/* left container  */}

      <h1 className='text-3xl font-semibold'>Create A New Account</h1>
      <div className='sm:w-1/2 w-full flex items-center  flex-col gap-2   '>
         <div className=''>
          <p>I am a </p>
          <div className='flex '> 
          <button className={`px-16 py-24 border border-gray-500 hover:border-blue-500 ${formData.role==='student'?'':'border-blue-500'}  `}>
            <FaUserGraduate/>
            <p>Student</p>
          </button>
          <button className={`px-16 py-24 border border-gray-500 hover:border-blue-500 ${formData.role==='recruiter'?'':'border-blue-500'}  `}>
            <FaUserTie/>
            <p>Recruiter</p>
          </button>
          </div>
          </div> 
          <div className='my-2 py-5 gap-2  '>
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
    </div>
    <div className='w-1/2 bg-blue-500 py-16 px-10 '>
      {/* right div  */}

    </div>

    </div>
  )
}

export default Signup