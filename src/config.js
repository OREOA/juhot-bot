import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.API_URL;
const BASE_URL = process.env.BASE_URL;
const ENABLE_FREE_TEXT = process.env.ENABLE_FREE_TEXT;
const FREE_TEXT_IN_PRIVATE_ONLY = process.env.FREE_TEXT_IN_PRIVATE_ONLY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
export default {
    TELEGRAM_TOKEN,
};
//# sourceMappingURL=config.js.map