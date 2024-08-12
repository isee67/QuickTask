import React, {useState} from 'react'
import * as request from '../request/util.request'

function Register({toogleRegister}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
  
    async function handleRegister(){
        if(username === '') {
            alert("用户名不可为空！");
            return;
        }
        if(password == '') {
            alert("密码不可为空！");
            return;
        }
        if(code == '') {
            alert("邀请码不可为空！");
            return;
        }
      const success = await request.register(username, password, code);
      if (success) {
        alert("注册成功！点击取消然后登录。");
      } else {
        alert("注册失败，用户名已存在或邀请码错误！");
      }
    };
  
    return (
    <div
        className="fixed resize inset-0 flex items-center overflow-auto justify-center bg-black bg-opacity-70 "
      >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white/60 p-5 w-1/4 rounded-lg text-left text-green-900 dark:text-gray-600">
          <h2 className="text-2xl mb-4">注册</h2>
          <div>
            <h1>用户名：</h1>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='请输入用户名'
              className="w-full mb-3 bg-white dark:bg-gray-300 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 dark:text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <h1>密码：</h1>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='请输入密码'
              className="w-full mb-3 bg-white dark:bg-gray-300 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 dark:text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <h1>邀请码：</h1>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='请输入邀请码'
              className="w-full mb-3 bg-white dark:bg-gray-300 rounded border border-gray-300 focus:border-green-400 focus:dark:border-gray-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 dark:text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={handleRegister}
            className='rounded-lg bg-yellow-200 h-10 w-5/12 mr-3 ml-3 hover:bg-yellow-300 text-green-900 dark:text-gray-500'
          >
            注册
          </button>
          <button onClick={toogleRegister}
            className='rounded-lg bg-white dark:bg-gray-500 h-10 w-5/12 ml-3 hover:bg-gray-100 hover:dark:bg-gray-600 text-green-900 dark:text-gray-100'
          > 
            取消
          </button>
        </div>
      </div>
      </div>
    )
}

export default Register