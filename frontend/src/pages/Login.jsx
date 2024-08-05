import React from 'react'

function Login() {
    return (

        <div className="text-gray-900 bg-[url('./src/assets/image/loginBackground.png')] bg-cover">
            <div className='container flex flex-wrap items-center min-h-screen'>
                <div className='flex flex-wrap rounded-lg  shadow-2xl bg-gray-300/20 w-3/4 px-5 py-5 mx-auto'>
                    <div className='w-3/5 pr-0 mb-32 ml-8 font-medium text-4xl text-green-900'>
                        欢迎来到Quick Task！
                    </div>
                    <div className='flex flex-col flex-wrap w-1/3 rounded-lg shadow-2xl bg-gray-100/40 px-5 py-4'>
                        <h2 className='text-2xl text-green-900 mb-4'>
                            登录
                        </h2>
                        <div>
                            <p className='text-green-900 mb-1'>账号</p>
                            <input type="text" placeholder="请输入账号" className='mb-3 w-full 
                            bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></input>
                            <p className='text-green-900 mb-1'>密码</p>
                            <input type="password" placeholder="请输入密码" className='mb-6 w-full 
                            bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></input>
                        </div>
                        <button className='rounded-lg bg-yellow-200 h-10 hover:bg-yellow-300 text-green-900'>
                            登录
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login