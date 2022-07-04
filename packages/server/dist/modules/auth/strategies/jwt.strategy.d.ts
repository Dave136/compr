import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.entity';
import { Payload } from 'src/utils/types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(validationPayload: Payload): Promise<User>;
}
export {};
