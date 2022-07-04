import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterInput } from './dto/register.input';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validate(email: string, password: string): Promise<User>;
    register(registerInput: RegisterInput): {
        accessToken: string;
    };
    login(user: User): {
        accessToken: string;
    };
    verifyToken(token: string): Promise<User>;
}
