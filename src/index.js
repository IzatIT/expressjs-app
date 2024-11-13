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
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const user_1 = require("./models/user");
const user_2 = require("./constants/user");
const user_3 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT = 8000 } = process.env;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use("/api/v1/user", user_3.default);
app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.get("*", (req, res) => {
    res.status(505).json({ message: "Bad Request" });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.sync().then(() => {
        console.log("Connected to database");
    });
    try {
        const adminPass = yield bcrypt_1.default.hash("123123", 10);
        yield user_1.User.findOrCreate({
            where: { login: "admin" },
            defaults: {
                age: 20,
                fullname: "Super Admin",
                inn: "admin",
                login: "admin",
                password: adminPass,
                role: user_2.USER_ROLES.SUPER_ADMIN,
                sex: true,
            }
        });
        const readerPass = yield bcrypt_1.default.hash("321312", 10);
        yield user_1.User.findOrCreate({
            where: { login: "111111" },
            defaults: {
                age: 21,
                fullname: "Reader",
                inn: "reader",
                login: "reader",
                password: readerPass,
                role: user_2.USER_ROLES.READER,
                sex: true,
            }
        });
        console.log("created");
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=index.js.map