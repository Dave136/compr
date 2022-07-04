"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validate(email, password) {
        const user = this.userService.getUserByEmail(email);
        if (!user)
            null;
        const matchPassword = password === user.password;
        return matchPassword ? user : null;
    }
    register(registerInput) {
        const user = this.userService.getUserByEmail(registerInput.email);
        if (user) {
            throw new Error('User already exists');
        }
        const newUser = this.userService.createUser(registerInput);
        const payload = {
            email: newUser.email,
            sub: +newUser.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    login(user) {
        const payload = {
            email: user.email,
            sub: +user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async verifyToken(token) {
        const decoded = this.jwtService.verify(token, {
            secret: 'secret',
        });
        const user = this.userService.getUserByEmail(decoded.email);
        if (!user) {
            throw new Error('Unable get user from decoded token');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map