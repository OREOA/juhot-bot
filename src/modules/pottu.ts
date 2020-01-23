import bot from "../bot"
import { Markup, Extra } from "telegraf"
import stickers from "../stickers.json"
import events from "../services/events"
import tools from "../tools"

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

bot.command('oispakaljaa', ({ reply }) =>
    reply('Milloin', Markup
        .keyboard(tools.getBeerDates())
        .oneTime()
        .resize()
        .extra()
    )
)

bot.command('milloin', (ctx) => {
    console.log(ctx.update.message)
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        const date = ctx.message.text.split(' ')[1]
        const resource = {
            summary: 'Kaljaa',
            start: {
                date: date
            },
            end: {
                date: date
            }
        }

        events.calendar.events.insert({
            // @ts-ignore
            resource,
            auth: events.jwtClient,
            calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
        }, (err: any, response: any) => {
            if (err) {
                console.log(err)
                ctx.reply('Ei kaljaa')
            } else {
                ctx.reply('Toimii')
            }
        })
    } else {
        ctx.reply('Virhetilanne')
    }
})
