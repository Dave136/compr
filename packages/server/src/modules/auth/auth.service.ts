import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/users.entity';
import { UsersService } from '../user/users.service';
import { jwtSecret } from './constants';
import { RegisterInput } from './dto/register.input';
import { Payload } from './types/payload-type';
import { Tokens } from './types/tokens-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(dto: User): Promise<Tokens> {
    const user = await this.usersService.findById(dto.id);

    if (!user) {
      throw new Error('User not found');
    }

    const tokens = await this.getToken(user.id, user.email);
    this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: string) {
    this.usersService.updateRefreshToken(id, '');
    return true;
  }

  async register(registerInput: RegisterInput) {
    const password = await bcrypt.hash(registerInput.password, 10);

    const user = await this.usersService.create({
      ...registerInput,
      password,
    });

    const tokens = await this.getToken(user.id, user.email);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = await this.usersService.findByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }

  async refreshToken(id: string, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findById(id);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatches = user.refreshToken === refreshToken;

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getToken(user.id, user.email);
    this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getToken(id: string, email: string): Promise<Tokens> {
    const payload: Payload = {
      email,
      sub: id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
