import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden font-sans">
      
      {/* Extremely subtle background gradient meshes for a "clean" but premium feel */}
      <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bg-blue-200 top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full  blur-[100px]"></div>
        <div className="absolute top-[60%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-200 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Simplifying Campus Placements
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Connect Talent with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
            Opportunity
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 font-light leading-relaxed">
          A streamlined platform designed for students and recruiters to make hiring effortless, transparent, and incredibly fast.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            to="/signup" 
            className="group flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/login" 
            className="flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Hero;