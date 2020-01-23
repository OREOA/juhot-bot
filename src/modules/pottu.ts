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

const beerEvent = {
    summary: '',
    start: {
        date: ''
    },
    end: {
        date: ''
    }
}

bot.command('oispakaljaa', (ctx) => {
    beerEvent.summary = ''
    beerEvent.start.date = ''
    beerEvent.end.date = ''
    ctx.reply('Milloin', Markup
        .keyboard(tools.getBeerDates())
        .oneTime()
        .resize()
        .extra()
    )
})

bot.command('milloin', (ctx) => {
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        const date = ctx.message.text.split(' ')[1]
        beerEvent.start.date = date
        beerEvent.end.date = date
        ctx.reply('Anna nimi tapahtumalle komennolla:\n/nimi "tapahtumn nimi"')
    } else {
        ctx.reply('Virhetilanne')
    }
})

bot.command('nimi', (ctx) => {
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        const name = ctx.message.text.slice(6)
        beerEvent.summary = name
        ctx.reply(`Luodaanko tapahtuma: ${beerEvent.summary}@${beerEvent.start.date}`, Markup
        .keyboard(['/luo', '/ei'])
        .oneTime()
        .resize()
        .extra()
    )
    } else {
        ctx.reply('Virhetilanne')
    }
})

bot.command('oispakaljaa', (ctx) => {
    beerEvent.summary = ''
    beerEvent.start.date = ''
    beerEvent.end.date = ''
    ctx.reply('Milloin', Markup
        .keyboard(tools.getBeerDates())
        .oneTime()
        .resize()
        .extra()
    )
})

bot.command('ei', (ctx) => {
    beerEvent.summary = ''
    beerEvent.start.date = ''
    beerEvent.end.date = ''
    ctx.reply('Peruttu')
})

bot.command('luo', (ctx) => {
    events.calendar.events.insert({
        // @ts-ignore
        resource: beerEvent,
        auth: events.jwtClient,
        calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
    }, (err: any, response: any) => {
        if (err) {
            console.log(err)
            ctx.reply('Virhetilanne')
        } else {
            ctx.reply('Tapahtuma luotu!')
        }
    })
})
