import bot from "../bot"
import { Context, ContextMessageUpdate } from 'telegraf'
import stickers from "../stickers.json"

const replyWithSticker = (sticker: string) => (ctx: ContextMessageUpdate) => {
    ctx.replyWithSticker(sticker)
}

bot.on("sticker", ({ message }) => {
    const sticker = message && message.sticker
})
