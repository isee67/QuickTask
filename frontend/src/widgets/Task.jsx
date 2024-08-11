import React, { useState, useEffect } from 'react';

function Task({id, projectId,name,updateTaskName,isTaskCompleted,updateTaskState}) {
  const [showDetail, setShowDetail] = useState(false);
  const[localIsTaskCompleted, setLocalIsTaskCompleted] = useState(isTaskCompleted);
  const [localName, setLocalName] = useState(name);
  useEffect(() => {
    if (showDetail) {
      // 或许会补充点东西
    }
  }, [showDetail]);


  const [files, setFiles] = useState([]);

  function handleFileChange(event){
    setFiles(event.target.files);
  };

  // const fileList = Array.from(files).map((file) => (
  //   <img key={file.name} src={URL.createObjectURL(file)} alt="附件" />
  // ));

  return (
    <div id={id}>
      <div className='w-full'>
      <button
        className={`${isTaskCompleted ? 'line-through': ''} w-11/12 rounded bg-white/50 border border-gray-300 text-decoration hover:underline text-green-900 mb-4 px-2 text-left`}
        onClick={() => setShowDetail(!showDetail)} 
      >
        {localName}
      </button>
      <input
                type="checkbox"
                checked={localIsTaskCompleted}
                onChange={e => {setLocalIsTaskCompleted(e.target.checked); updateTaskState(id, projectId, e.target.checked)}}
                className="w-1/12 scale-110"
              />
      </div>
      {showDetail && (

        <div
          className="fixed resize inset-0 flex items-center overflow-auto justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white/60 p-5 rounded-lg text-left">
            <h1>任务：</h1><textarea className='resize w-full
            bg-yellow-100/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm' value={localName} 
            onChange={e => {
              setLocalName(e.target.value); // 更新本地状态
              updateTaskName(id, projectId, e.target.value); // 调用父组件传来的更新函数从而更新后端的状态
            }}
            >

            </textarea>

            <h1>详情：</h1><textarea className='resize w-full
            bg-yellow-100/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm' placeholder='请输入任务详情'></textarea>

            <h1>附件：</h1>
            <input type="file" className="
            bg-yellow-100/80 rounded-full border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm px-2 mt-3" multiple onChange={handleFileChange} />

            <h1>截止日期：</h1>
            <input type="datetime-local" className='resize w-full
            bg-yellow-100/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm'></input>

            <p></p>
            <div className="flex justify-center items-center">
            <button
              className="
            bg-yellow-100/80 rounded-full border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm px-2 mt-3"
              onClick={() => setShowDetail(false)}
            >
              关
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;