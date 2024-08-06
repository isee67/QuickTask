import React from 'react'
import Project from '../widgets/Project'
import Draggable from 'react-draggable'
function Projects() {
  function addProject(){
    return (<Project project={456} id={456} />)
  }
  return (
    <div className="bg-[url('./src/assets/image/projectsBackground.png')] bg-cover min-h-screen text-green-900 text-base">
      <div className='no-scrollbar flex overflow-y-scroll overflow-x-scroll h-screen w-screen largeBorder rounded-lg shadow-2xl'>
        {addProject()}{addProject()}{addProject()}
      </div>
    </div>   
  )
}

export default Projects