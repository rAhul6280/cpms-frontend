import React, { forwardRef } from 'react';

const Input = forwardRef(({ placeholder, value, onChange, className, type = "text", icon: Icon, name, id, error, ...props }, ref) => {
  return (
    <div className="w-full relative pb-4">
        {Icon && (
          <div className="absolute left-3.5 top-3 text-gray-400 dark:text-gray-500">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          id={id || name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${className || ''} ${Icon ? 'pl-11' : 'px-4'} ${error ? 'border-red-400 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-200 dark:focus:ring-blue-900 hover:border-gray-400 dark:hover:border-gray-600'}  rounded-xl py-2.5 outline-none text-gray-700 dark:text-gray-100 border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:border-blue-500 dark:focus:border-blue-500 w-full transition-all duration-200 shadow-sm bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900`}
          ref={ref}
          autoComplete='off'
          {...props}
        />
        {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1 absolute bottom-0 left-1 font-medium">{error}</p>}
    </div>
  )
});

Input.displayName = 'Input';

export default React.memo(Input);