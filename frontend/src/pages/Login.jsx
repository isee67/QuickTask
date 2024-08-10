import React ,{useState}from 'react'
import { useNavigate} from 'react-router-dom';
import * as request from '../request/util.request'
import Projects from './Projects';
import Register from '../widgets/Register';
function Login() {
    let navigate = useNavigate();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    function toogleRegister(){
        setIsRegisterOpen(!isRegisterOpen);
    }
    async function handleLogin()  {
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        if(username === '') {
            alert("用户名不可为空！")
            return;
        }; 
        if(password == '') {
            alert("密码不可为空！");
            return;
        }
        const success = await request.login(username, password);
        if(success){
            navigate('/projects'); 
        }
        else{
            alert("登录失败，请检查你的账号和密码！")
        }

    }

    const [isNightMode, setIsNightMode] = useState(false);

    const toggleNightMode = () => {
      setIsNightMode(!isNightMode);
    };
    return (
        <div className="text-gray-900 bg-[url('./src/assets/image/loginBackground.png')] bg-cover">
            <div className='flex flex-wrap items-center min-h-screen largeBorder'>
                <div className='flex flex-wrap rounded-lg clearGlass w-3/4 px-5 py-5 mx-auto'>
                    <div className='w-3/5 pr-0 mb-32 ml-8 font-medium text-4xl text-green-900'>
                        欢迎来到Quick Task！
                    </div>
                    <div className='flex flex-col flex-wrap w-1/3 rounded-lg clearGlass px-5 py-4'>
                        <h2 className='text-2xl text-green-900 mb-4'>
                            登录
                        </h2>
                        <div>
                            <p className='text-green-900 mb-1'>用户名</p>
                            <input type="text" placeholder="请输入账号" className='mb-3 w-full 
                            bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></input>
                            <p className='text-green-900 mb-1'>密码</p>
                            <input type="password" placeholder="请输入密码" className='mb-6 w-full 
                            bg-white rounded border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-green-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></input>
                        </div>
                        <div className='w-full'>
                            <button onClick={handleLogin}
                                className='rounded-lg bg-yellow-200 h-10 w-5/12 mr-5 ml-3 hover:bg-yellow-300 text-green-900'>
                                登录
                            </button>
                            
                            <button onClick={toogleRegister}
                                className='rounded-lg bg-white h-10 w-5/12 hover:bg-gray-50 text-green-900'>
                                    注册    
                            </button>
                        </div>
                        
                    </div>
                </div>
                <button
                    className="fixed top-3 right-4 z-50 p-2" onClick={toggleNightMode}>
                    {isNightMode ? (
                        <span
                            className="icon-[material-symbols--nightlight-off-rounded] text-6xl text-green-900/80"
                        ></span>) : (
                        <span
                            className="icon-[material-symbols--nightlight-badge-sharp] text-6xl text-green-900/80"
                        ></span>
                    )}
                </button>
                {isRegisterOpen && <Register toogleRegister={toogleRegister}/>}
            </div>
        </div>

    )
}

export default Login