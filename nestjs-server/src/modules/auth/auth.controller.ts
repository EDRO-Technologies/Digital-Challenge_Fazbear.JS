import { Controller, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SocialUser } from './types/socialUser';
import { HttpException, HttpStatus } from '@nestjs/common'
import { Protected } from './auth-protected.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  authGoogle() {}

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  authYandex() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async authGoogleCallback(@Req() req, @Response() res) {
    if (!req.user)
      throw new HttpException("No user from google", HttpStatus.FORBIDDEN);
    
    const userWithToken = await this.authService.socialLogin(new SocialUser(req.user));

    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        userWithToken,
      )}', '*');window.close()</script>`,
    );
      // return this.authService.socialLogin(new SocialUser(req.user));

  }

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  authYandexCallback(@Req() req, @Response() res) {
    if (!req.user)
      throw new HttpException("No user from yandex", HttpStatus.FORBIDDEN);

    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        new SocialUser(req.user),
      )}', '*');window.close()</script>`,
    );
  }

  @Get('hello')
  @UseGuards(Protected)
  test(@Req() req) {
    return 'Hello';
  }
}
