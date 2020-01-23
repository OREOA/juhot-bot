import bot from "../bot"
import { Context, ContextMessageUpdate } from 'telegraf'
import stickers from "../stickers.json"
import events from "../services/events"
import tools from "../tools"

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

bot.command('kaljaa', (ctx) => {
    ctx.reply('Kaljaa seuraavina päivinä:')
    events.calendar.events.list({
        auth: events.jwtClient,
        calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
        timeMin: new Date().toISOString(),
        orderBy: 'starttime',
        singleEvents: true
    }, (err: any, response: any) => {
        if (err) {
            console.log(err)
            ctx.reply('Ei kaljaa')
        } else {
            const events = response.data.items.map((e: any) => (
                `${tools.parseDate(e.start)}: ${e.summary}`
            ))
            ctx.reply(events.join('\n'))
        }
    })
})