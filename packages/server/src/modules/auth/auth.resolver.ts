import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  login(
    @Context() ctx: any,
    @Args('input') loginInput: LoginInput,
  ): AuthResponse {
    return this.authService.login(ctx as User);
  }

  @Mutation(() => AuthResponse)
  register(
    @Context() ctx: any,
    @Args('input') registerInput: RegisterInput,
  ): AuthResponse {
    console.log({ ctx });
    return this.authService.register(registerInput);
  }
}
