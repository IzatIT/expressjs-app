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
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const user_1 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const user_2 = require("../constants/user");
const router = express_1.default.Router();
router.post("/register", auth_1.authenticateToken, (0, auth_1.authorizeRole)([user_2.USER_ROLES.SUPER_ADMIN]), (0, middlewares_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new user_1.UserController();
    const response = yield controller.register(req.body);
    res.status(201).json(response);
})));
router.post("/login", (0, middlewares_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new user_1.UserController();
    const response = yield controller.authorize(req.body);
    res.json(response);
})));
router.get("/", (req, res) => {
    res.json({ message: "Success" });
});
exports.default = router;
//# sourceMappingURL=user.js.map