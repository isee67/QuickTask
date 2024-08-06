import React from 'react'
import Project from '../widgets/Project'
import Draggable from 'react-draggable'
function Projects() {
  return (
    <div className="bg-[url('./src/assets/image/projectsBackground.png')] bg-cover min-h-screen text-green-900 text-base">
      <div className='scrollbar-hide flex overflow-y-scroll overflow-x-scroll h-screen w-screen border-8 border-gray-600/20 rounded-lg shadow-2xl'>
        <Project project={123} id={1}/>
        <Draggable>
        <div className="overflow-auto resize w-1/12 blurGlass rounded-lg flex flex-col">
        123
        </div>
        </Draggable>
      </div>
    </div>   
  )
}

export default Projects