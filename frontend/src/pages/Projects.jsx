import React, { useState } from 'react';
import Project from '../widgets/Project';
import Draggable from 'react-draggable';

function Projects() {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const [projects, setProjects] = useState([]);

  const addProject = (id) => {
    const newProject = (
      <Project id={id} />
    );

    setProjects([...projects, newProject]);
  };

  return (
    <div className="bg-[url('./src/assets/image/projectsBackground.png')] bg-cover min-h-screen text-green-900 text-base">
      <div className="no-scrollbar flex-1 overflow-y-scroll overflow-x-scroll h-screen w-screen largeBorder rounded-lg shadow-2xl">
        
        {projects}

        <button
          className="fixed top-3 right-4 z-50 p-2" onClick={() => addProject(Date.now())}>
          <span className="icon-[material-symbols--add-circle-rounded] text-6xl text-green-900/80"></span>
        </button>

        <button className="fixed top-20 right-4 z-50 p-2">
          <span className="icon-[majesticons--messages] text-6xl text-green-900/80"></span>
        </button>

        <button
          className="fixed top-36 right-4 z-50 p-2" onClick={toggleNightMode}>
          {isNightMode ? (
            <span
              className="icon-[material-symbols--nightlight-off-rounded] text-6xl text-green-900/80"
            ></span>) : (
            <span
              className="icon-[material-symbols--nightlight-badge-sharp] text-6xl text-green-900/80"
            ></span>
          )}
        </button>

      </div>
    </div>
  );
}

export default Projects;