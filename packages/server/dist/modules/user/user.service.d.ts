import { CreateUserArgs } from './dto/create-user.args';
import { GetUserArgs } from './dto/get-user.args';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.entity';
export declare class UserService {
    private users;
    getUser(getUserArgs: GetUserArgs): User;
    getUsers(getUsersArgs: GetUsersArgs): User[];
    getUserByEmail(email: string): User;
    createUser(createUserArgs: CreateUserArgs): User;
}
