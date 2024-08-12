import React from 'react'

function Comment({id, author, content, date}) {
  return (
    <div className="flex flex-col items-center">
    <div className='flex-col w-full border bg-yellow-100/80 dark:bg-gray-500 border-gray-300 rounded-lg px-2 py-2 mb-1'>
        <h2 className='font-semibold'>{author}：</h2>
        <p className='text-sm'>{content}</p>
        <p className='text-xs text-right italic underline'>{date}</p>
    </div>
    <span className="icon-[fluent-emoji--leaf-fluttering-in-wind] mb-1"></span>
    </div>
  )
}

export default Comment