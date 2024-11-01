import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Response } from 'express';
import { SessionInfo } from '../common/decorators/session-info.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from './auth.service';
import { CookieService } from './cookies/cookie.service';
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signUp(body.email, body.password);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInBodyDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signIn(body.email, body.password);
    this.cookieService.setToken(res, accessToken);
  }

  @SkipThrottle()
  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @SkipThrottle()
  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
