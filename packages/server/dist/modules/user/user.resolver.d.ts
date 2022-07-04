import { GetUserArgs } from './dto/get-user.args';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getUser(getUserArgs: GetUserArgs): User;
    getUsers(getUsersArgs: GetUsersArgs): User[];
}
