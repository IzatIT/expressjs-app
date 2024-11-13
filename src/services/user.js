"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_2 = require("../constants/user");
class UserService {
    constructor() {
        this.jwtSecret = user_2.JWT_SECRET;
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const newUser = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            const [user] = yield user_1.User.findOrCreate({ where: { inn: newUser.inn }, defaults: newUser });
            return user;
        });
    }
    login(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { login: login } });
            if (!user) {
                throw new Error("404");
            }
            let isPasswordValid = false;
            isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("401");
            }
            const accessToken = this.generateToken(user);
            return Object.assign({ accessToken, refreshToken: "213123" }, user.dataValues);
        });
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, login: user.login, password: user.password, role: user.role }, this.jwtSecret, { expiresIn: '2h' });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map