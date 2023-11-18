import { Injectable } from '@nestjs/common';
import { UserResponse } from '../user/responses/user.response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SocialUser } from './types/socialUser';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private JWT_SECRET: string;

  constructor(
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    this.JWT_SECRET = configService.get<string>('AUTH_JWT_SECRET');
  }

  jwtSign(payload: object): string {
    return this.jwtService.sign(payload, { secret: this.JWT_SECRET });
  } 

  async socialLogin(user: SocialUser) {
    let dbUser = await this.userRepository.findOne({where: {
      email: user.email
    }})

    if (dbUser === null) {
      dbUser = await this.userRepository.save(
        this.userRepository.create({...user})
      );
    }

    const userResponse = new UserResponse({...dbUser});

    return {
      ...userResponse,
      accessToken: this.jwtSign({...userResponse })
    };
  }


  async emailLogin(email: string, password: string) {
    
  }
}
