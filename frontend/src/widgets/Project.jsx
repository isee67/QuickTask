import React, { useEffect, useState } from 'react';
import '../index.css'
import Draggable from 'react-draggable'; 

function Project({project, id}) {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  // useEffect(
  //   function(){
  //     const handleDrop = (e) => {
  //       e.preventDefault();
  //       setPosition({ x: e.clientX, y: e.clientY });
  //     };
  
  //     const projectCard = document.getElementById(id);
  //     projectCard.addEventListener('drop', handleDrop);

  //     return function(){
  //       projectCard.removeEventListener('drop', handleDrop);
  //     }
  //   }, [id, setPosition]
  // )
  
  return (
    <Draggable handle='.dragHandler' bounds={{top:0, left:0, bottom:screen.height, right:screen.availWidthidth}}>
    <div id={id} 
        className="overflow-auto resize blurGlass rounded-lg w-1/4 m-3 pb-5 px-2 flex flex-col">
        {/* <input type="text" className='mb-3 w-full my-2
        bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
        </input> 
        <div>
            任务1
        </div> */}
        <div>
          <div className="dragHandler h-4 flex justify-center">
            <span class="icon-[mdi--drag-horizontal] size-6"></span>
          </div> 
          <input type="text" className='mb-3 w-full my-2
          bg-white/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
          text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
          'placeholder='请输入项目名'>
          </input> 
        </div>
        
    </div>
    </Draggable>
  )
}

export default Project