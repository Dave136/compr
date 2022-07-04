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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const get_user_args_1 = require("./dto/get-user.args");
const get_users_args_1 = require("./dto/get-users.args");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(getUserArgs) {
        return this.userService.getUser(getUserArgs);
    }
    getUsers(getUsersArgs) {
        return this.userService.getUsers(getUsersArgs);
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user', nullable: false }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_args_1.GetUserArgs]),
    __metadata("design:returntype", user_entity_1.User)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users', nullable: 'items' }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_args_1.GetUsersArgs]),
    __metadata("design:returntype", Array)
], UserResolver.prototype, "getUsers", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map