import { Inject, Controller, Post, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Project, Task, TaskDetails } from '../service/model';
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register') 
  async register(){
    const {username, password, code} = this.ctx.request.body as {
      username: string, password: string, code: string
    };
      // 调用 userService 中的登录逻辑
      const result = await this.userService.register(username, password, code)

      if (result) {
        // console.log("注册成功");
        return this.ctx.body = { success: true };
        
      } else {
        // console.log("注册失败");
        return this.ctx.body = { success: false };
      }
  }

  @Post('/login')
  async login() { 
    const { username, password } = this.ctx.request.body as {
      username: string, password: string
    };
      // 调用 userService 中的验证逻辑
      // console.log("成功到达后端Controller！")
      const result = await this.userService.login(username, password);

      if (result) {
        // console.log("登录验证成功");
        return this.ctx.body = { success: true };
      } else {
        // console.log("登录验证失败"); 
        return this.ctx.body = { success: false };
      }
  }

  //-------------------------------------------------------------------------------

  // @Post('/updateProjects')
  // async updateProjects(){
  //   const projects = this.ctx.request.body as Project[];
  //   this.userService.updateProjects(projects);
  //   // console.log("到达更新项目的Controller！");
  //   // console.log(projects);
  // }
  @Post('/addProject')
  async addProject(){
    const project = this.ctx.request.body as {id: number, name: string};
    this.userService.addProject(project.id,project.name);
  }
  @Post('/deleteProject')
  async deleteProject(){
    const id = this.ctx.request.body as {id: number};
    await this.userService.deleteProject(id.id);
  }
  @Get('/getProjects')
  async getProjects() {
    const data: Project[] = await this.userService.getProjects();
    // console.log("到达获得项目的Controller！");
    // console.log(data);
    return data;
  }

  @Post('/updateProjectName')
  async updateProjectName(){
    const project = this.ctx.request.body as {
      id: number, newName: string
    }
    this.userService.updateProjectName(project.id, project.newName);
  }

  //-------------------------------------------------------------------------------

  @Post('/getTasks') 
  async getTasks(){
    const project = this.ctx.request.body as { id: number};  
    //请求体的结构必须和as {} 的结构完全一样好像，"id"不能换成别的名字
    // console.log("请求体:", this.ctx.request.body);
    // console.log("pid:" + project.id);
    const data: Task[] = await this.userService.getTasks(project.id);
    return data;
  }

  @Post('/addTask')
  async addTask(){
    const task = this.ctx.request.body as {projectId: number, taskId: number};
    await this.userService.addTask(task.projectId, task.taskId);
  }

  @Post('/updateTaskName')
  async updateTaskName(){
    const task = this.ctx.request.body as {projectId: number, taskId: number, newName: string};
    this.userService.updateTaskName(task.projectId, task.taskId, task.newName);
  }

  @Post('/updateTaskState')
  async updateTaskState(){
    const task = this.ctx.request.body as {projectId: number, taskId: number, newState: boolean};
    this.userService.updateTaskState(task.projectId, task.taskId, task.newState);
  }

  @Post('/updateTaskDetails')
  async updateTaskDetails(){
    const task = this.ctx.request.body as {projectId: number, taskId: number, taskDetails: TaskDetails};
    this.userService.updateTaskDetails(task.projectId, task.taskId, task.taskDetails);
  }

  @Post('/getTaskDetails')
  async getTaskDetails(){
    const task = this.ctx.request.body as {projectId: number, taskId: number};
    const data: TaskDetails = await this.userService.getTaskDetails(task.projectId, task.taskId);
    return data;
  }

  @Get('/getAuthor')
  async getAuthor(){
    const author: string = await this.userService.getAuthor();
    return author;
  }
}
