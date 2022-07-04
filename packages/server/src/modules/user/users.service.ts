import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'abcn194891247jksmoiu978ln',
      email: 'test@gmail.com',
      name: 'test',
      username: 'test123',
      password: 'test1234',
      refreshToken: '',
    },
  ];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      id: v4(),
      ...createUserData,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find((user) => user.id === updateUserData.id);

    Object.assign(user, updateUserData);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.id === getUserArgs.id);
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.ids.map((id) => this.getUser({ id }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === deleteUserData.id,
    );

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }

  public updateRefreshToken(id: string, token: string) {
    const user = this.users.find((user) => user.id === id);

    Object.assign(user, { ...user, refreshToken: token });

    return user;
  }
}
