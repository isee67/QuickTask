import React, { useState } from 'react';
import Project from '../widgets/Project';
import Draggable from 'react-draggable';

function Projects() {
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
          className="fixed top-4 right-4 z-50 p-2"
          onClick={() => addProject(Date.now())}
        >
          <span
            className="icon-[material-symbols--add-circle-rounded] text-6xl text-green-900/80"
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Projects;