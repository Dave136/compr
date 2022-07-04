import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/utils/types';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = this.userService.getUserByEmail(email);

    if (!user) null;

    const matchPassword = password === user.password;
    return matchPassword ? user : null;
  }

  register(registerInput: RegisterInput): { accessToken: string } {
    const user = this.userService.getUserByEmail(registerInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.userService.createUser(registerInput);

    const payload: Payload = {
      email: newUser.email,
      sub: +newUser.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  login(user: User): { accessToken: string } {
    const payload: Payload = {
      email: user.email,
      sub: +user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<User> {
    const decoded: Payload = this.jwtService.verify(token, {
      secret: 'secret',
    });

    const user = this.userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable get user from decoded token');
    }

    return user;
  }
}
