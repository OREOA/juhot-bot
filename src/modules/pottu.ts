import bot from "../bot"
import { Context, ContextMessageUpdate } from 'telegraf'
import stickers from "../stickers.json"
import events from "../services/events"

const replyWithSticker = (sticker: string) => (ctx: ContextMessageUpdate) => {
    ctx.replyWithSticker(sticker)
}

bot.on("sticker", ({ message }) => {
    const sticker = message && message.sticker
})

bot.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))
bot.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))

bot.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers.glom))
bot.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers.glom))

bot.command('events', async (ctx) => {
    ctx.reply('test')
    events.calendar.events.list({
        auth: events.jwtClient,
        calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com'
    }, (err: any, response: any) => {
        if (err) {
            ctx.reply('error')
        } else {
            console.log(response.data.items)
            ctx.reply(JSON.stringify(response.data.items))
        }
    })
})