"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const core_1 = __importDefault(require("@sequelize/core"));
const user_1 = require("../models/user");
const host = String(process.env.DB_HOST || "localhost");
const port = Number(process.env.DB_PORT || 5432);
const database = String(process.env.DB_DATABASE || "EXPRESS_APP");
const user = String(process.env.DB_USER || "postgres");
const password = String(process.env.DB_PASSWORD || "postgres");
exports.db = new core_1.default({
    //@ts-ignore
    database,
    user,
    password,
    host,
    port,
    dialect: "postgres",
    models: [user_1.User]
});
//# sourceMappingURL=index.js.map