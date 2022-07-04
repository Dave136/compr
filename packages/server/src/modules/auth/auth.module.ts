import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
