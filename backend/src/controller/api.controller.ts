import { Inject, Controller, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
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
        console.log("注册成功");
        return this.ctx.body = { success: true };
        
      } else {
        console.log("注册失败");
        return this.ctx.body = { success: false };
      }
  }

  @Post('/login')
  async login() { 
    const { username, password } = this.ctx.request.body as {
      username: string, password: string
    };
      // 调用 userService 中的验证逻辑
      console.log("成功到达后端Controller！")
      const result = await this.userService.login(username, password);

      if (result) {
        console.log("登录验证成功");
        return this.ctx.body = { success: true };
      } else {
        console.log("登录验证失败"); 
        return this.ctx.body = { success: false };
      }
  }
}
