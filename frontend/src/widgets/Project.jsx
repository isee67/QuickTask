import React, { useEffect, useState } from 'react';
import '../index.css'
import Draggable from 'react-draggable'; 
import Task from './Task';
import * as request from '../request/util.request';

function Project({id, deleteProject, name, updateProjectName}) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async ()=>{
    setTasks(await request.getTasks(id));
  }
  useEffect(()=>{
    fetchTasks()
  },[])

  async function addTask(){
    const newTask = {
      id: Date.now(), // 使用当前时间戳作为唯一id
      name: "未命名任务",
      isTaskCompleted: false
    };
    setTasks([...tasks, newTask]);
    await request.addTask(id, newTask.id)
  };
  async function updateTaskName(taskId, projectId, newName){
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
    await request.updateTaskName(taskId, projectId, newName);
  };
  async function updateTaskState(taskId, projectId, newState) {
    // console.log(newState);
    const updatedTasks = tasks.map(task => {
      if(task.id === taskId){
        return {...task, isTaskCompleted: newState};
      }
  return task;
});
  setTasks(updatedTasks);
  await request.updateTaskState(taskId, projectId, newState);
}
  return (
    <Draggable id={id} handle='.dragHandler'>
      <div className="no-scrollbar overflow-auto resize blurGlass rounded-lg w-1/4 min-h-20 m-3 pb-1 px-2 flex flex-col">
          <div className="dragHandler h-4 flex justify-center">
            <span className="icon-[mdi--drag-horizontal] size-6"></span>
          </div>
          <div>
            <input type="text" className='mb-3 w-full my-2
            bg-white/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            font-bold outline-none text-green-900/80 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            value={name}
            onChange={e => updateProjectName(id, e.target.value)}
            >
              {/* 项目名称输入框 */}
            </input> 
            {tasks.map(task => (
              <Task
                key={task.id}
                id={task.id}
                projectId={id}
                name={task.name}
                updateTaskName={updateTaskName}
                isTaskCompleted={task.isTaskCompleted}
                updateTaskState={updateTaskState}
              />
          ))}
          <div>
          <button
            className='rounded-lg bg-yellow-200/80 h-7 hover:bg-yellow-300/80 text-green-900 w-11/12 mb-4'
            onClick={addTask}
          >
            +
          </button>
          <button className='w-1/12' id='project delete button' onClick={deleteProject}>
          <span className="icon-[material-symbols--delete]"></span>
          </button>
          </div>
          </div> 
      </div>
    </Draggable>
  )
}

export default Project