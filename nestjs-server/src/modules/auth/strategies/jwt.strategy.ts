import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { UserResponse } from 'src/modules/user/responses/user.response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    } as StrategyOptions);
  }

  public validate(payload?: UserResponse): UserResponse {
    if (payload === undefined) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
