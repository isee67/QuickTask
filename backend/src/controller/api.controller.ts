import { Inject, Controller, Get, Query, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
const projects = [];
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  // @Post('/add_Project')
  // async addProject(){
  //   const text = this.ctx.request.body;
  //   projects.push(text);
  //   return 'ok'
  // }

  // @Get('/get_Projects')
  // async getProjects(){
  //   return projects;
  // }

  @Post('/api/verify')
  async verify() { 
    const { userName, password } = this.ctx.request.body;

    try {
      // 调用 userService 中的验证逻辑
      const result = await this.userService.verifyUser(userName, password);

      if (result) {
        // 验证成功
        return this.ctx.body = { success: true, message: '验证成功' };
      } else {
        // 验证失败
        return this.ctx.body = { success: false, message: '用户名或密码错误' };
      }
    } catch (error) {
      // 错误处理，例如记录日志
      console.error('Error during verification:', error);
      this.ctx.status = 500;
      return this.ctx.body = { success: false, message: '服务器错误' };
    }
  }
}
