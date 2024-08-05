import React from 'react'
import '../index.css'
function Project({project}) {
  return (
    <div className="blurGlass rounded-lg w-1/4 mt-3 pb-5 px-2 flex flex-col">
        <input type="text" className='mb-3 w-full my-2
        bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
            
        </input>
        <div>
            任务1
        </div>
    </div>
  )
}

export default Project