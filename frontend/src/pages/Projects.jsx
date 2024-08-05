import React from 'react'
import Project from '../widgets/Project'
function Projects() {
  return (
    <div className="bg-[url('./src/assets/image/projectsBackground.png')] bg-cover min-h-screen text-green-900 text-base flex">
        <Project project={123}/>
        <div className="w-1/12 blurGlass rounded-lg flex flex-col">
        123
        </div>
    </div>   
  )
}

export default Projects