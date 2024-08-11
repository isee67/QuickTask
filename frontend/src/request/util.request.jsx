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
  const response = await client.post('/api/register', {username, password, code});
  return response.data.success;
}

//-------------------------------------------------------------------------------------

export async function addProject(id, name) {
  await client.post('/api/addProject', {id, name});
}

export async function deleteProject(id) {
  await client.post('/api/deleteProject',{id});
}

export async function getProjects() {
  const response = await client.get('/api/getProjects');
  return response.data;
}

export async function updateProjectName(id, newName) {
  await client.post('/api/updateProjectName',{id, newName});
}

//-------------------------------------------------------------------------------------

export async function getTasks(id) {
  const response = await client.post('/api/getTasks', {id});
  return response.data;
}

export async function addTask(projectId, taskId) {
  await client.post('/api/addTask',{projectId, taskId});
}

export async function updateTaskName(taskId, projectId, newName) {
  await client.post('/api/updateTaskName',{projectId, taskId, newName});
}

export async function updateTaskState(taskId, projectId, newState) {
  await client.post('/api/updateTaskState',{projectId, taskId, newState});
}
