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
exports.User = void 0;
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const core_1 = require("@sequelize/core");
const user_1 = require("../constants/user");
class User extends core_1.Model {
}
exports.User = User;
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER),
    decorators_legacy_1.PrimaryKey,
    decorators_legacy_1.AutoIncrement,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING),
    decorators_legacy_1.NotNull,
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER),
    decorators_legacy_1.NotNull,
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING),
    decorators_legacy_1.Unique,
    decorators_legacy_1.NotNull,
    __metadata("design:type", String)
], User.prototype, "inn", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.BOOLEAN),
    decorators_legacy_1.NotNull,
    __metadata("design:type", Boolean)
], User.prototype, "sex", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING),
    decorators_legacy_1.Unique,
    decorators_legacy_1.NotNull,
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING),
    decorators_legacy_1.NotNull,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.ENUM([user_1.USER_ROLES.ADMIN,
        user_1.USER_ROLES.CLIENT,
        user_1.USER_ROLES.READER,
        user_1.USER_ROLES.SUPER_ADMIN])),
    decorators_legacy_1.NotNull,
    __metadata("design:type", String)
], User.prototype, "role", void 0);
//# sourceMappingURL=user.js.map