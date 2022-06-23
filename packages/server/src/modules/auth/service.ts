import { Tokens } from './entity';

export interface Claims {
  sub: string;
  iat: string;
  exp: string;
  uid: string;
}

export interface IAuthService {
  generateToken(username: string, password: string): Tokens;
}

export class AuthService implements IAuthService {
  generateToken(username: string, password: string): Tokens {
    // Mocked data
    const user = username === 'Dave';
    const isValidPassword = user && password === '123456Mm!';

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // TODO: generate token and return value
    return { accessToken: '1a2b3c4d' };
  }
}
