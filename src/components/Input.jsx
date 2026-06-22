import React from 'react'

function Input({placeholder,value,onChange,className,ref,type="text"},props) {
  return (
    <div>
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} sm:w-2xl rounded-lg hover:border-gray-700  px-4 py-2 outline-none text-gray-500 border border-gray-500 placeholder:text-gray-500 focus:ring focus:ring-blue-500 w-full `}
        ref={ref}
        {...props}
        />
    </div>
  )
}

export default React.memo(Input)