"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importDefault(require("telegraf"));
const config_1 = __importDefault(require("./config"));
const { TELEGRAM_TOKEN } = config_1.default;
if (!TELEGRAM_TOKEN) {
    throw new Error("No TELEGRAM_TOKEN specified");
}
const bot = new telegraf_1.default(TELEGRAM_TOKEN);
exports.default = bot;
//# sourceMappingURL=bot.js.map