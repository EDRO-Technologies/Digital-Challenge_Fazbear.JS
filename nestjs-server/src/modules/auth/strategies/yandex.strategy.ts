import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, Config as YandexConfig } from 'passport-yandex';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { SocialUser } from '../types/socialUser';

type Done = (error: string | null, user: any) => void;

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('YANDEX_CLIENT_ID'),
      clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET'),
      callbackURL: `http://localhost:3000/auth/yandex/callback`,
    } as YandexConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Done,
  ): Promise<any> {
    done(
      null,
      new SocialUser({
        ...profile,
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
      })
    );
  }
}