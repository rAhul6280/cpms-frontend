import React from 'react'

function Loading() {
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-linear-to-b from-blue-200 to-blue-50 dark:from-gray-900 dark:to-gray-950'>
        <div className='h-14 w-14  border-r-4  rounded-full border-b-4 border-b-blue-800 border-r-blue-800 border-white dark:border-gray-900 animate-spin '>

        </div>

    </div>
  )
}

export default Loading