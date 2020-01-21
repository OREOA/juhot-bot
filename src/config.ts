import dotenv from 'dotenv'
dotenv.config()

const API_URL = process.env.API_URL
const BASE_URL = process.env.BASE_URL
const ENABLE_FREE_TEXT = process.env.ENABLE_FREE_TEXT
const FREE_TEXT_IN_PRIVATE_ONLY = process.env.FREE_TEXT_IN_PRIVATE_ONLY
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const DB_NAME = process.env.DB_NAME || ''
const DB_USER = process.env.DB_USER || ''
const DB_PASSWORD = process.env.DB_PASSWORD|| ''
const DB_HOST = process.env.DB_HOST || ''

export default {
    TELEGRAM_TOKEN,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST
}
