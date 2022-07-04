import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/users.entity';
import { UsersService } from 'src/modules/user/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const ctx = GqlExecutionContext.create(context).getContext();
  //   const args = GqlExecutionContext.create(context).getArgs();
  //   console.log({ args });
  //   const { email, password } = ctx.req.body.variables;
  //   const user: User = this.usersService.getUserByEmail(email);

  //   if (user.password === password) {
  //     ctx.user = user;
  //     return true;
  //   }

  //   throw new UnauthorizedException('UnauthorizedException');
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Login data pass by args
    const ctx = GqlExecutionContext.create(context).getContext();
    const args = GqlExecutionContext.create(context).getArgs();
    const { email, password } = args.input;
    const user: User = this.usersService.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      ctx.user = user;
      return true;
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
