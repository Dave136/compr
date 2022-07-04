import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.entity';
import { Payload } from 'src/utils/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt_secret',
    });
  }

  async validate(validationPayload: Payload): Promise<User> {
    return this.userService.getUserByEmail(validationPayload.email);
  }
}
