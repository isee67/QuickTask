// import * as axios from 'axios'

// const client = axios.default;

// const base = "http://127.0.0.1:7001";


 
// export async function login(username, password) {
//     return await client.post(base + "/api/login",{username:username, password:password}).
//     then((response)=>{
//         return response.data
//     })
// }

// export async function getTitle() {
//     const result = await client.get(base);
//     return result.data;
// }

//util.request.jsx:
import axios from 'axios';

const client = axios.create({ baseURL: "http://127.0.0.1:7001" });

export async function login(username, password) {
    const response = await client.post('/api/login', { username, password });
    return response.data.success;
}

export async function register(username, password, code) {
  const response = await client.post('/api/register', {username, password, code})
  return response.data.success;
}
