import bot from "../bot"
import { Context, ContextMessageUpdate } from 'telegraf'
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

bot.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))
bot.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))

bot.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers.glom))
bot.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers.glom))

