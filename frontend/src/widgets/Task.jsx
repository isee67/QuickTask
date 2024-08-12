import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import * as request from '../request/util.request';

function Task({ id, projectId, name, updateTaskName, isTaskCompleted, updateTaskState }) {
  const [hasGet, setHasGet] = useState(false);
  const [author, setAuthor] = useState("User");
  const [showDetail, setShowDetail] = useState(false);
  const [localIsTaskCompleted, setLocalIsTaskCompleted] = useState(isTaskCompleted);
  const [localName, setLocalName] = useState(name);
  const [taskDetails, setTaskDetails] = useState({
    details: "",
    files: [],
    ddl: "",
    comments: []
  });

  useEffect(() => {
    if (showDetail) {
      fetchTaskDetails();
    }
  }, [showDetail]);

  useEffect(() => {
    updateTaskDetails();
  }, [taskDetails]);

  function handleCommentSubmit(e) {
    e.preventDefault();
    const commentInput = document.querySelector('textarea[name="comment"]');
    const comment = commentInput.value.trim();
    const now = new Date();
    const localDate = now.toLocaleString();
    if (comment) {
      setTaskDetails({
        ...taskDetails,
        comments: [...taskDetails.comments, { author: author, content: comment, id: Date.now(), date: localDate }],
      });
      commentInput.value = ""; // 清空输入框
    }
  }

  async function fetchTaskDetails() {
    setTaskDetails(await request.getTaskDetails(projectId, id));
  }

  async function updateTaskDetails(){
    try{
      if(!hasGet) {//刷新后由于taskDetails的变化会自动启动一次updateTaskDetails，会导致details变为空，所以改为Get
      await request.getTaskDetails(projectId, id);
      setAuthor(await request.getAuthor());
      setHasGet(true);
    }
    else await request.updateTaskDetails(projectId, id, taskDetails);
  }
    catch(error){
      alert("上传失败，附件总体积过大！")
    }
  }

  function handleFileChange(e) {
    // console.log("进入处理文件变化");
    // console.log(taskDetails.files.length);
    const files = e.target.files;
    let fileListCopy = [...taskDetails.files];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) { // 确认是图片文件
        const reader = new FileReader();
        reader.onload = (e) => {
          fileListCopy.push({
            name: file.name,
            type: file.type,
            previewURL: e.target.result,//实际上就是文件URL，应该不是预览图URL
          });
          setTaskDetails({
            ...taskDetails,
            files: fileListCopy,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div id={id} className='text-green-900 dark:text-gray-50'>
      <div className='w-full'>
        <button
          className={`${isTaskCompleted ? 'line-through' : ''} w-11/12 rounded bg-white/50 border border-gray-300 text-decoration hover:underline mb-4 px-2 text-left`}
          onClick={() => setShowDetail(!showDetail)}
        >
          {localName}
        </button>
        <input
          type="checkbox"
          checked={localIsTaskCompleted}
          onChange={e => { setLocalIsTaskCompleted(e.target.checked); updateTaskState(id, projectId, e.target.checked) }}
          className="w-1/12 scale-110"
        />
      </div>
      {showDetail && (

        <div
          className="fixed resize inset-0 flex overflow-auto items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="flex-col overflow-auto bg-white/60 dark:bg-gray-500/70 text-green-900 dark:text-gray-300 h-4/5 p-5 rounded-lg text-left w-80">
            <h1>任务名称：</h1><textarea className='resize w-full
            bg-yellow-100/80 dark:bg-gray-700 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm' value={localName}
              onChange={e => {
                setLocalName(e.target.value); // 更新本地状态
                updateTaskName(id, projectId, e.target.value); // 调用父组件传来的更新函数从而更新后端的状态
              }}
            >

            </textarea>

            <h1>详情：</h1><textarea
              className='resize w-full
            bg-yellow-100/80 dark:bg-gray-700 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm'
              value={taskDetails.details} 
              onChange={e => setTaskDetails({...taskDetails, details: e.target.value})}>
            </textarea>

            <h1>附件：</h1>
            <div className="flex items-center justify-center w-full mb-2">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer bg-gray-100/80 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-yellow-100/80 dark:border-gray-600 dark:hover:border-gray-500 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="icon-[material-symbols--image] text-5xl"></span>
                  <p className="mb-2 text-sm dark:text-gray-400">点击或拖曳上传图片</p>
                  <p className="text-xs dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={e => handleFileChange(e)} />
              </label>
            </div>

            {Array.isArray(taskDetails.files) && taskDetails.files.length > 0 && (
        <div>
          <h1>已上传文件：</h1>
          <ul>
            {taskDetails.files.map((file, index) => (
              <li key={index}>
                  <img
                    src={file.previewURL}
                    alt={`File Preview ${index}`}
                  />
              </li>
            ))}
          </ul>
        </div>
      )}

            <h1>截止日期：</h1>
            <input type="datetime-local" 
            className='resize w-full mb-2
            bg-yellow-100/80 dark:bg-gray-700 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm'
            value={taskDetails.ddl}
            onChange={e => setTaskDetails({...taskDetails, ddl: e.target.value})}
            ></input>

              <h1>评论：</h1>
              <form onSubmit={handleCommentSubmit}>
              <textarea
              name='comment'
              className='resize w-full
            bg-yellow-100/80 dark:bg-gray-700 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm'>
            </textarea>
            <button 
            type="submit"
            className="bg-gray-100/80
            hover:bg-yellow-100/80 dark:bg-gray-700 hover:dark:bg-gray-800 rounded-md border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm px-2 mb-2"
            >
              提交
            </button>
            </form>
            {taskDetails.comments.length > 0 && (
              <div className="flex flex-col">
                {taskDetails.comments.map((comment) => (
                  <Comment key={comment.id} author={comment.author} content={comment.content} id={comment.id} date={comment.date} />
                ))}
              </div>
            )}

            <div className="flex justify-center items-center">
              <button
                className="bg-gray-100/80
            hover:bg-yellow-100/80 dark:bg-gray-700 hover:dark:bg-gray-800 rounded-full border border-gray-300 focus:border-green-400 focus:dark:border-gray-900 focus:ring-2 focus:ring-indigo-200 
            outline-none transition-colors text-sm px-2 mt-3"
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