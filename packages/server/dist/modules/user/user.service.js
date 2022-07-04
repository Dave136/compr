"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.users = [
            {
                id: '1',
                email: 'test@gmail.com',
                name: 'test',
                username: 'test123',
                password: 'test123445',
            },
        ];
    }
    getUser(getUserArgs) {
        return this.users.find((user) => user.id === getUserArgs.id);
    }
    getUsers(getUsersArgs) {
        return getUsersArgs.userIds.map((id) => this.getUser({ id }));
    }
    getUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    createUser(createUserArgs) {
        const newUser = Object.assign({ id: String(this.users.length + 1) }, createUserArgs);
        this.users.push(newUser);
        return newUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map