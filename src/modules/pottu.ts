import bot from "../bot"
import {Markup} from "telegraf"
import stickers from "../stickers.json"
import events from "../services/events"
import tools from "../tools"

bot.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))
bot.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))

bot.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers.glom))
bot.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers.glom))

bot.command('kaljaa', (ctx) => {
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
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        if (ctx.message.text.length === 12) {
            beerEvent.summary = ''
            beerEvent.start.date = ''
            beerEvent.end.date = ''
            ctx.reply('Milloin', Markup
                .keyboard(tools.getBeerDates())
                .oneTime()
                .resize()
                .extra()
            )
        } else {
            const regex = /(\d+)\.(\d+)\. (\d+):(\d+) (.+)/gi
            const result = regex.exec(ctx.message.text)
            const year = new Date().getFullYear()
            if (result !== null) {
                const dateTime = `${year}-${result[2]}-${result[1]}T${result[3]}:${result[4]}:00+02:00`
                events.calendar.events.insert({
                    // @ts-ignore
                    resource: {
                        summary: result[5],
                        start: {
                            dateTime
                        },
                        end: {
                            dateTime
                        }
                    },
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
            } else {
                ctx.reply('Väärä esitysmuoto\n/oispakaljaa DD.MM. HH:MM "Nimi"')
            }
        }
    } else {
        ctx.reply('Virhetilanne')
    }
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
