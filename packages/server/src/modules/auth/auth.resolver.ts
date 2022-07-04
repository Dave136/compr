import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/users.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginInput } from './dto/login-user.input';
import { RegisterInput } from './dto/register.input';
import { AuthGuard } from './guards/auth.guard';
import { Tokens } from './types/tokens-type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(AuthGuard)
  login(
    @Args('input') input: LoginInput,
    @Context('user') user: User,
  ): Promise<Tokens> {
    return this.authService.login(user);
  }

  @Mutation(() => LoginResponse)
  register(
    @Args('input') input: RegisterInput,
    @Context('user') user,
  ): Promise<Tokens> {
    return this.authService.register(input);
  }

  @Mutation(() => Boolean)
  logout(@Args('id') id: string) {
    return this.authService.logout(id);
  }
}
