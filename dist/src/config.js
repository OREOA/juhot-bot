"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = process.env.API_URL;
const BASE_URL = process.env.BASE_URL;
const ENABLE_FREE_TEXT = process.env.ENABLE_FREE_TEXT;
const FREE_TEXT_IN_PRIVATE_ONLY = process.env.FREE_TEXT_IN_PRIVATE_ONLY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
exports.default = {
    TELEGRAM_TOKEN,
};
//# sourceMappingURL=config.js.map