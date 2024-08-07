import React, { useEffect, useState } from 'react';
import '../index.css'
import Draggable from 'react-draggable'; 
import Task from './Task';

function Project(id) {
  const [tasks, setTasks] = useState([ /* 空任务列表 */ ]);

  function addTask(){
    // 创建一个新的任务对象，例如：{ id: newId, title: '新任务' }
    const newTask = {
      id: Date.now(), // 使用当前时间戳作为唯一id
    };

    // 更新状态，将新任务添加到任务列表中
    setTasks([...tasks, newTask]);
  };
  return (
    <Draggable id={id} handle='.dragHandler'>
      <div className="no-scrollbar overflow-auto resize blurGlass rounded-lg w-1/4 min-h-20 m-3 pb-1 px-2 flex flex-col">
          <div className="dragHandler h-4 flex justify-center">
            <span className="icon-[mdi--drag-horizontal] size-6"></span>
          </div>
          <div>
            <input type="text" className='mb-3 w-full my-2
            bg-white/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            font-bold outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            'placeholder='请输入项目名'>
            </input> 
            {tasks.map(task => (
            <Task id={task.id}/>
          ))}
          <button
            className='rounded-lg bg-yellow-200/80 h-7 hover:bg-yellow-300/80 text-green-900 w-full mb-4'
            onClick={addTask}
          >
            +
          </button>
          </div> 
      </div>
    </Draggable>
  )
}

export default Project