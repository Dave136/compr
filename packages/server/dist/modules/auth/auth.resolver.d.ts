import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(ctx: any, loginInput: LoginInput): AuthResponse;
    register(ctx: any, registerInput: RegisterInput): AuthResponse;
}
