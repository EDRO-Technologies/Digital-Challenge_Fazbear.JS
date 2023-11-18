import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { YandexStrategy } from './strategies/yandex.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [PassportModule, ConfigModule, TypeOrmModule.forFeature([User]) ],
  providers: [AuthService, GoogleStrategy, YandexStrategy, JwtStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
