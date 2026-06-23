import React, { useState } from 'react';
import Input from '../components/Input';
import { FaEnvelope, FaLock, FaChartLine, FaBriefcase } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login Submitted", formData);
      
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className=' w-full min-h-screen flex  bg-gray-50 font-sans'>
      {/* Left/Bottom Container - Form */}
      <div className='  px-6  w-full   md:w-1/2 flex flex-col justify-center items-center py-12  sm:px-12 lg:px-24 bg-white  z-11'>
        <div className='w-full  rounded-lg max-w-md space-y-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>Welcome Back</h1>
            <p className='mt-3 text-gray-500'>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div className='space-y-4 pb-2'>
              <Input
                icon={FaEnvelope}
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                name="email"
                error={errors.email}
              />
              <Input
                icon={FaLock}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                error={errors.password}
              />
            </div>

          

            <button
              type="submit"
              className='w-full py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:-translate-y-0.5'
            >
              Sign In
            </button>
            
            <p className='text-center text-sm text-gray-600 mt-6'>
              Don't have an account? <Link to="/signup" className='font-bold text-blue-600 hover:text-blue-500 transition-colors'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right/Top Container - Colorful Div */}
      <div className=' hidden md:flex w-full md:w-1/2 bg-linear-to-bl from-indigo-700 via-blue-600 to-blue-800 flex-col justify-center items-center py-16 px-10 text-white relative overflow-hidden  md:min-h-screen'>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-indigo-400 opacity-30 blur-2xl"></div>
        </div>
        
        <div className='relative z-10 text-center max-w-lg mx-auto'>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md'>Your Gateway to Success</h2>
          <p className='text-lg md:text-xl text-blue-50 font-medium leading-relaxed mb-12 drop-shadow'>
            Access your dashboard to manage opportunities, track applications, and grow your career.
          </p>
          
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.3)] inline-block text-left w-full sm:w-auto">
            <div className="flex items-center gap-5 mb-6 border-b border-white/20 pb-6">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                <FaChartLine size={24} className="text-white"/>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Track Progress</h3>
                <p className="text-blue-100 text-sm font-medium mt-1">Monitor your placement journey</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-lg">
                <FaBriefcase size={24} className="text-white"/>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">New Opportunities</h3>
                <p className="text-blue-100 text-sm font-medium mt-1">Discover latest job openings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;