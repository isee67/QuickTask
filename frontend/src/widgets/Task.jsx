import React, { useState, useEffect } from 'react';

function Task(id) {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (showDetail) {
      // 当模态框显示时，可以添加一些额外的处理，比如阻止滚动等
    }
  }, [showDetail]);


  const [files, setFiles] = useState([]);

  function handleFileChange(event){
    setFiles(event.target.files);
  };

  const fileList = Array.from(files).map((file) => (
    <img key={file.name} src={URL.createObjectURL(file)} alt="附件" />
  ));


  return (
    <div id={id}>
      <button
        className='rounded bg-white/50 border border-gray-300 text-decoration hover:underline text-green-900 w-full mb-4 px-2 text-left'
        onClick={() => setShowDetail(!showDetail)}
      >
        任务1
      </button>
      {showDetail && (

        <div
          className="fixed resize inset-0 flex items-center overflow-auto justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white/60 p-5 rounded-lg text-left">
            <h1>任务：</h1><textarea className='resize w-full
            bg-yellow-100/80 rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 
            outline-none text-green-900  transition-colors text-sm'placeholder='请输入任务名称'></textarea>

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