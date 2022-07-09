import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/users.entity';
import { UsersService } from 'src/modules/user/users.service';
// import { AuthService } from '../auth.service';
import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(validationPayload: {
    email: string;
    password: string;
  }): Promise<User | null> {
    // return this.authService.validate(validationPayload);
    return this.usersService.findByEmail(validationPayload.email);
  }
}
