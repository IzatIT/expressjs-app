"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const user_1 = require("../constants/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware для проверки токена и декодирования роли
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, user_1.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = Object.values(user_1.USER_ROLES).find(el => { var _a; return el === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role); });
        if (userRole && !allowedRoles.includes(userRole)) {
            res.sendStatus(403);
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=auth.js.map