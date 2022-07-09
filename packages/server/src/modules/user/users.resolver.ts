import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
// import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoami(@CurrentUser() user: User): User {
    return user;
  }

  @Query(() => [User], { name: 'users', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // 👀 is neccessary ?
  // @Mutation(() => User)
  // createUser(@Args('createUserData') createUserData: CreateUserInput): User {
  //   return this.usersService.createUser(createUserData);
  // }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('data') dto: UpdateUserInput): Promise<User> {
    return this.usersService.update(dto);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
