import React, { useState } from 'react';
import Input from '../components/Input';
import { FaUserGraduate, FaUserTie, FaUser, FaEnvelope, FaLock } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';
import Loading from '../components/Loading';


function Signup() {


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });

  const [errors, setErrors] = useState({});
  const { authRegister, authLoading } = useAuth();

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await authRegister(formData)
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student"
      })
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return authLoading?<Loading/>:(
    <div className='w-full min-h-screen flex flex-col-reverse md:flex-row bg-gray-50 font-sans'>
      {/* Left Container - Form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center py-12 px-6 sm:px-12 lg:px-24 bg-white  z-10'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>Create an Account</h1>
            <p className='mt-3 text-gray-500'>Join us today! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
            <div className='space-y-3 pb-2'>
              <p className='text-sm font-semibold text-gray-700'>I am a:</p>
              <div className='flex gap-4'>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`flex-1 flex flex-col items-center justify-center gap-3 py-5 rounded-2xl border-2 transition-all duration-200 ${formData.role === 'student'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-500'
                    }`}
                >
                  <FaUserGraduate size={26} className={formData.role === 'student' ? 'text-blue-600' : 'text-gray-400'} />
                  <span className='font-semibold text-sm'>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                  className={`flex-1 flex flex-col items-center justify-center gap-3 py-5 rounded-2xl border-2 transition-all duration-200 ${formData.role === 'recruiter'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-500'
                    }`}
                >
                  <FaUserTie size={26} className={formData.role === 'recruiter' ? 'text-blue-600' : 'text-gray-400'} />
                  <span className='font-semibold text-sm'>Recruiter</span>
                </button>
              </div>
            </div>

            <div className='space-y-1 '>
              <Input
                icon={FaUser}
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
                error={errors.fullName}
              />
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
              <Input
                icon={FaLock}
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                error={errors.confirmPassword}
              />
            </div>

            <button
              type="submit"
              className='w-full py-3.5 px-4 mt-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:-translate-y-0.5'
            >
              Sign Up
            </button>

            <p className='text-center text-sm text-gray-600 mt-6'>
              Already have an account? <Link to="/login" className='font-bold text-blue-600 hover:text-blue-500 transition-colors'>Log in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Container - Colorful Div */}
      <div className=' md:flex hidden  w-1/2 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex-col justify-center items-center py-16 px-10 text-white relative overflow-hidden min-h-screen'>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-2xl"></div>
        </div>

        <div className='relative z-10 text-center max-w-lg mx-auto'>
          <h2 className='text-5xl font-extrabold mb-6 leading-tight drop-shadow-md'>Welcome to CPMS!</h2>
          <p className='inline-block text-xl text-blue-50 font-medium leading-relaxed mb-12 drop-shadow'>
            Streamline your campus placements. Connect top talent with leading recruiters effortlessly.
          </p>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hidden md:inline-block text-left w-auto ">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <FaUserGraduate size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">For Students</h3>
                <p className="text-blue-100 text-sm font-medium mt-1">Land your dream job</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg">
                <FaUserTie size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">For Recruiters</h3>
                <p className="text-blue-100 text-sm font-medium mt-1">Hire top candidates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup;