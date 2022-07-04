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
exports.CreateUserArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateUserArgs = class CreateUserArgs {
};
__decorate([
    (0, class_validator_1.IsString)({ message: 'The type entered for the name field is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The name field cannot be empty' }),
    __metadata("design:type", String)
], CreateUserArgs.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'The type entered for the username field is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The username field cannot be empty' }),
    __metadata("design:type", String)
], CreateUserArgs.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'The type entered for the email field is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The email field cannot be empty' }),
    __metadata("design:type", String)
], CreateUserArgs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'The type entered for the password field is not valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The password field cannot be empty' }),
    __metadata("design:type", String)
], CreateUserArgs.prototype, "password", void 0);
CreateUserArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateUserArgs);
exports.CreateUserArgs = CreateUserArgs;
//# sourceMappingURL=create-user.args.js.map