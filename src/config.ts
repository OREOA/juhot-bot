import dotenv from 'dotenv'
dotenv.config()

const API_URL = process.env.API_URL
const BASE_URL = process.env.BASE_URL
const ENABLE_FREE_TEXT = process.env.ENABLE_FREE_TEXT
const FREE_TEXT_IN_PRIVATE_ONLY = process.env.FREE_TEXT_IN_PRIVATE_ONLY
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const AWS_KEY = process.env.AWS_KEY
const AWS_SECRET = process.env.AWS_SECRET

export default {
    TELEGRAM_TOKEN,
    AWS_KEY,
    AWS_SECRET
}
