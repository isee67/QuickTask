import { Provide } from '@midwayjs/core';
import * as DB from './fileDB';
const CODE = "icey608";
import { Project, Task } from './model';
@Provide() 
export class UserService {
  // 注册功能
  async register(username: string, password: string, code: string): Promise<boolean> {
    if (code !== CODE) return false;
    return DB.addUser({ username, password}); 
  } 

  // 登录功能
  async login(username: string, password: string): Promise<boolean> {
    return DB.verifyUser(username, password);
  }

  //-------------------------------------------------------------------------------

  // //更新项目列表
  // async updateProjects(projects: Project[]) {
  //   DB.writeProjects(projects);
  // }

  async addProject(id: number, name: string) {
    DB.addProject(id, name);
  }
  async deleteProject(id: number){
    DB.deleteProject(id);
  }

  async getProjects(): Promise<Project[]>{
    console.log(DB.readProjects());
    return DB.readProjects();
  }

  async updateProjectName(id:number, newName: string){
    DB.updateProjectName(id, newName);
  }

  //-------------------------------------------------------------------------------

  async getTasks(projectId: number): Promise<Task[]> {
    return DB.getTasks(projectId);
  }

  async addTask(projectId: number, taskId: number){
    DB.addTask(projectId, taskId);
  }

  async updateTaskName(projectId: number, taskId: number, newName:string){
    DB.updateTaskName(projectId, taskId, newName);
  }

  async updateTaskState(projectId: number, taskId: number, newState:boolean){
    DB.updateTaskState(projectId, taskId, newState);
  }
}