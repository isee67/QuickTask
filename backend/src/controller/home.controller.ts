import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
  // @Post('/test')
  // async test() {
  //   return "test success"!;
  // }//不能直接通过地址栏访问
  //终于不404了，眼睛要尿尿了
}
