import Telegraf from "telegraf";
import config from "./config";
const { TELEGRAM_TOKEN } = config;
if (!TELEGRAM_TOKEN) {
    throw new Error("No TELEGRAM_TOKEN specified");
}
const bot = new Telegraf(TELEGRAM_TOKEN);
export default bot;
//# sourceMappingURL=bot.js.map