import React, { useState, useEffect } from 'react';
import Project from '../widgets/Project';
import Draggable from 'react-draggable';
import * as request from '../request/util.request';
function Projects() {
  // 从localStorage读取isNightMode的值，如果不存在则使用false作为默认值
  const [isNightMode, setIsNightMode] = useState(() => {
    return localStorage.getItem('isNightMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isNightMode);
}, [isNightMode]);

  function toggleNightMode(){
    const newIsNightMode = !isNightMode;
    setIsNightMode(newIsNightMode);
    localStorage.setItem('isNightMode', newIsNightMode.toString());
  };

  const [projects, setProjects] = useState([]);

  const fetchProjects = async ()=>{
    setProjects(await request.getProjects());
  }
  useEffect(()=>{
    fetchProjects()
  },[])

  async function updateProjectName(id, newName){
    const updatedProjects = projects.map(project => {
      if (project.id === id) {
        return { ...project, name: newName };
      }
      return project;
    });
    setProjects(updatedProjects);
    await request.updateProjectName(id, newName);
  };

  async function addProject () {
    const newProject = {
      id: Date.now(),
      name: "未命名项目"
      //默认新项目任务列表为空，在后端体现
    };
    setProjects([...projects, newProject]);
    await request.addProject(newProject.id, newProject.name);
  };
  async function deleteProject(id){
    setProjects(projects.filter(project => project.id !== id));
    await request.deleteProject(id);
  }

  return (
    <div>
    <div className="bg-[url('./src/assets/image/background.png')] dark:bg-[url('./src/assets/image/darkBackground.jpeg')] bg-cover min-h-screen text-green-900 dark:text-gray-300 text-base">
      <div className="no-scrollbar flex-1 overflow-y-scroll overflow-x-scroll h-screen w-screen largeBorder rounded-lg shadow-2xl">

        {projects.map(project => 
          (<Project
            key={project.id}//列表必须的
            id={project.id}
            name={project.name}
            deleteProject={() => deleteProject(project.id)}
            updateProjectName={updateProjectName} />
          ))}
        <button
          className="fixed top-4 right-4 z-50 p-2" onClick={() => addProject()}>
          <span className="icon-[material-symbols--add-circle-rounded] text-6xl text-green-900/80 dark:text-gray-300"></span>
        </button>

        {/* <button className="fixed top-20 right-4 z-50 p-2">
          <span className="icon-[majesticons--messages] text-6xl"></span>
        </button> */}

        <button
          className="fixed top-20 right-4 z-50 p-2" onClick={toggleNightMode}>
          {isNightMode ? (
            <span
              className="icon-[material-symbols--nightlight-off-rounded] text-6xl text-gray-300"
            ></span>) : (
            <span
              className="icon-[material-symbols--nightlight-badge-sharp] text-6xl text-green-900/80"
            ></span>
          )}
        </button>

      </div>
    </div>
    </div>
  );
}

export default Projects;