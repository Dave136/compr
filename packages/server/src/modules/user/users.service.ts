import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: { password: true },
    });
  }

  async create(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      id: v4(),
      ...createUserData,
    };

    const created = await this.usersRepository.save(user);

    return created;
  }

  async update(updateUserData: UpdateUserInput): Promise<User> {
    await this.usersRepository.update(updateUserData.id, updateUserData);
    const user = await this.findById(updateUserData.id);

    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findById(id);
    await this.usersRepository.delete(id);
    return user;
  }

  async updateRefreshToken(id: string, token: string) {
    await this.usersRepository.update(id, {
      refreshToken: token,
    });
  }
}
