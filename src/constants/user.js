"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["ADMIN"] = "ADMIN";
    USER_ROLES["SUPER_ADMIN"] = "SUPER_ADMIN";
    USER_ROLES["READER"] = "READER";
    USER_ROLES["CLIENT"] = "CLIENT";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
exports.JWT_SECRET = process.env.JWT_SECRET || "123";
//# sourceMappingURL=user.js.map