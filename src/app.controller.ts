import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
class HelloWorldDTO {
  @ApiProperty()
  message: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    type: HelloWorldDTO,
  })
  async getHello(): Promise<HelloWorldDTO> {
    return { message: this.appService.getHello() };
  }
}
