import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CookieService } from '../../auth/cookies/cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.key];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const sessionInfo = this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req['session'] = sessionInfo;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
