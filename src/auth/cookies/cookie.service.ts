import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor() {}
  static key = 'access-token';
  setToken(res: Response, token: string) {
    res.cookie(CookieService.key, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
  }
  removeToken(res: Response) {
    res.clearCookie(CookieService.key);
  }
}
