import { Provide } from '@midwayjs/core';
import * as DB from './fileDB';
const CODE = "icey608";
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
}