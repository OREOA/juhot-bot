import bot from "../bot"
import { ContextMessageUpdate } from 'telegraf'
import stickers from "../stickers.json"

const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva']

const containsSussi = (text: string) => {
    for (let sussi of SUSSIS) {
        if (text.includes(sussi)) {
            return true
        }
    }
    return false
}

const replyWithSticker = (sticker: string) => (ctx: ContextMessageUpdate) => {
    ctx.replyWithSticker(sticker)
}

bot.on("message", ({ message }) => {
    const text = message && message.text
    if (text && containsSussi(text)) {
        replyWithSticker(stickers.glom)
    }
})