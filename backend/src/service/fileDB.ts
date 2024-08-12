import {writeFileSync, readFileSync} from 'fs';
import { Project,User,Task, TaskDetails } from './model';

let author: string = "";//在登录的时候确定评论的作者
// 存储用户数据文件的路径
const userDataFilePath = './userData.json'

// 读取用户数据
export function readUsers(): User[] {
    const data = readFileSync(userDataFilePath, 'utf8');
    return JSON.parse(data);
}

// 写入用户数据
export function writeUsers(users: User[]){
  const data = JSON.stringify(users, null, 2);
  writeFileSync(userDataFilePath, data, 'utf8');
}

// 添加用户
export function addUser(user: User): boolean {
  const users = readUsers();
  if (users.some(u => u.username === user.username)) {
    return false; // 用户名已存在
  }
  users.push(user);
  writeUsers(users);
  return true;
}

// 根据用户名查找用户
export function findUserByUsername(username: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.username === username);
}

// 验证用户
export async function verifyUser(username: string, password: string): Promise<boolean> {
  const user = findUserByUsername(username);
  if (!user) {
    return false;
  }
  if(password === user.password){
    author = username;
    return true;
  }else return false;
}

//--------------------------------------------------------------------------------------------

const projectsDataFilePath = './projectsData.json'
//写项目列表
export function writeProjects(projects: Project[]){
  const data = JSON.stringify(projects, null, 2);
  writeFileSync(projectsDataFilePath, data, 'utf8');
} 

//读项目列表
export function readProjects() : Project[] {
  const data = readFileSync(projectsDataFilePath, 'utf8');
  return JSON.parse(data);
}

export function addProject(id: number, name: string){
  let projects: Project[];
    projects = readProjects();
  const newProject = {
    id: id,
    name: name,
    tasks: []
  } as Project;
  projects.push(newProject);
  writeProjects(projects);
}

export function deleteProject(id: number){
  const projects = readProjects();
  const newProjects = projects.filter(project => project.id !== id);
  writeProjects(newProjects);
}

export function updateProjectName(id: number, newName:string){
  let projects: Project[] = readProjects();
  const projectIndex = projects.findIndex(project => project.id === id);
  projects[projectIndex].name = newName;
  writeProjects(projects);
}

//-------------------------------------------------------------------------------------

function findProjectIndexById(id: number): number{
  const projects = readProjects();
  return projects.findIndex(project => project.id === id)
}

export function getTasks(projectId: number): Task[] {
  const projects = readProjects();
  const projectIndex = findProjectIndexById(projectId);
  // console.log("projectIndex:" + projectIndex);
  return projects[projectIndex].tasks;
}

export function addTask(projectId: number, taskId: number) {
  let projects: Project[] = readProjects();
  // console.log("添加前projects：" + JSON.stringify(projects, null, 2));
  let projectIndex = findProjectIndexById(projectId);
  // console.log(project);
  const newTask = {
    id: taskId,
    name: "未命名任务",
    isTaskCompleted: false,
    details: {
      details: "任务详情",
      ddl: "",
      files: [],
      comments: []
    }
  } as Task;
  projects[projectIndex].tasks.push(newTask);
  // console.log("添加后projects：" + JSON.stringify(projects, null, 2));
  // console.log(project);
  writeProjects(projects);
}

export function updateTaskName(projectId: number, taskId: number, newName: string){
  let projects: Project[] = readProjects();
  const projectIndex = findProjectIndexById(projectId);
  const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === taskId);
  projects[projectIndex].tasks[taskIndex].name = newName;
  writeProjects(projects);
}

export function updateTaskState(projectId: number, taskId: number, newState: boolean){
  let projects: Project[] = readProjects();
  const projectIndex = findProjectIndexById(projectId);
  const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === taskId);
  projects[projectIndex].tasks[taskIndex].isTaskCompleted = newState;
  writeProjects(projects);
}

export function updateTaskDetails(projectId: number, taskId: number,taskDetails: TaskDetails){
  let projects: Project[] = readProjects();
  const projectIndex = findProjectIndexById(projectId);
  const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === taskId);
  projects[projectIndex].tasks[taskIndex].details.details = taskDetails.details;
  projects[projectIndex].tasks[taskIndex].details.ddl = taskDetails.ddl;
  projects[projectIndex].tasks[taskIndex].details.files = taskDetails.files;
  projects[projectIndex].tasks[taskIndex].details.comments = taskDetails.comments;
  writeProjects(projects);
}

export function readTaskDetails(projectId: number, taskId: number): TaskDetails{
  const projects: Project[] = readProjects();
  const projectIndex = findProjectIndexById(projectId);
  const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === taskId);
  console.log("projectIndex:" + projectIndex);
  console.log("taskIndex" + taskIndex);
  // console.log("project:" + projects[projectIndex]);
  // console.log("tasks:" + projects[projectIndex].tasks[taskIndex].details);
  if(projectIndex === -1 || taskIndex === -1 ) 
    return {details: "任务详情",
    ddl: "",
    files: [],
    comments: []};
  return projects[projectIndex].tasks[taskIndex].details;
}

export function readAuthor(): string{
  return author;
}