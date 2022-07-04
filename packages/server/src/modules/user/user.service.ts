import { Injectable } from '@nestjs/common';
import { CreateUserArgs } from './dto/create-user.args';
import { GetUserArgs } from './dto/get-user.args';
import { GetUsersArgs } from './dto/get-users.args';

import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      email: 'test@gmail.com',
      name: 'test',
      username: 'test123',
      password: 'test123445',
    },
  ];

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === getUserArgs.id);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((id) => this.getUser({ id }));
  }

  public getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  public createUser(createUserArgs: CreateUserArgs): User {
    const newUser: User = {
      id: String(this.users.length + 1),
      ...createUserArgs,
    };

    this.users.push(newUser);

    return newUser;
  }
}
