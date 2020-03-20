"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("../bot"));
const telegraf_1 = require("telegraf");
const stickers_json_1 = __importDefault(require("../stickers.json"));
const events_1 = __importDefault(require("../services/events"));
const tools_1 = __importDefault(require("../tools"));
bot_1.default.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers_json_1.default.pottu));
bot_1.default.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers_json_1.default.pottu));
bot_1.default.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers_json_1.default.glom));
bot_1.default.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers_json_1.default.glom));
bot_1.default.command('kaljaa', (ctx) => {
    events_1.default.calendar.events.list({
        auth: events_1.default.jwtClient,
        calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
        timeMin: new Date().toISOString(),
        orderBy: 'starttime',
        singleEvents: true
    }, (err, response) => {
        if (err) {
            console.log(err);
            ctx.reply('Ei kaljaa');
        }
        else {
            const events = response.data.items.map((e) => (`${tools_1.default.parseDate(e.start)}: ${e.summary}`));
            ctx.reply(`Kaljaa seuravina päivinä:\n${events.join('\n')}`);
        }
    });
});
const beerEvent = {
    summary: '',
    start: {
        date: ''
    },
    end: {
        date: ''
    }
};
bot_1.default.command('oispakaljaa', (ctx) => {
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        if (ctx.message.text.length === 12) {
            beerEvent.summary = '';
            beerEvent.start.date = '';
            beerEvent.end.date = '';
            ctx.reply('Milloin', telegraf_1.Markup
                .keyboard(tools_1.default.getBeerDates())
                .oneTime()
                .resize()
                .extra());
        }
        else {
            const regex = /(\d+)\.(\d+)\. (\d+):(\d+) (.+)/gi;
            const result = regex.exec(ctx.message.text);
            const year = new Date().getFullYear();
            if (result !== null) {
                const dateTime = `${year}-${result[2]}-${result[1]}T${result[3]}:${result[4]}:00+02:00`;
                events_1.default.calendar.events.insert({
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
                    auth: events_1.default.jwtClient,
                    calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        ctx.reply('Virhetilanne');
                    }
                    else {
                        ctx.reply('Tapahtuma luotu!');
                    }
                });
            }
            else {
                ctx.reply('Väärä esitysmuoto\n/oispakaljaa DD.MM. HH:MM "Nimi"');
            }
        }
    }
    else {
        ctx.reply('Virhetilanne');
    }
});
bot_1.default.command('milloin', (ctx) => {
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        const date = ctx.message.text.split(' ')[1];
        beerEvent.start.date = date;
        beerEvent.end.date = date;
        ctx.reply('Anna nimi tapahtumalle komennolla:\n/nimi "tapahtumn nimi"');
    }
    else {
        ctx.reply('Virhetilanne');
    }
});
bot_1.default.command('nimi', (ctx) => {
    if (ctx.message !== undefined && ctx.message.text !== undefined) {
        const name = ctx.message.text.slice(6);
        beerEvent.summary = name;
        ctx.reply(`Luodaanko tapahtuma: ${beerEvent.summary}@${beerEvent.start.date}`, telegraf_1.Markup
            .keyboard(['/luo', '/ei'])
            .oneTime()
            .resize()
            .extra());
    }
    else {
        ctx.reply('Virhetilanne');
    }
});
bot_1.default.command('oispakaljaa', (ctx) => {
    beerEvent.summary = '';
    beerEvent.start.date = '';
    beerEvent.end.date = '';
    ctx.reply('Milloin', telegraf_1.Markup
        .keyboard(tools_1.default.getBeerDates())
        .oneTime()
        .resize()
        .extra());
});
bot_1.default.command('ei', (ctx) => {
    if (beerEvent.summary !== '') {
        beerEvent.summary = '';
        beerEvent.start.date = '';
        beerEvent.end.date = '';
        ctx.reply('Peruttu');
    }
});
bot_1.default.command('luo', (ctx) => {
    if (beerEvent.summary !== '') {
        events_1.default.calendar.events.insert({
            // @ts-ignore
            resource: beerEvent,
            auth: events_1.default.jwtClient,
            calendarId: 'pmcgjlt8sqlvg43gp947a9ujmc@group.calendar.google.com',
        }, (err, response) => {
            if (err) {
                console.log(err);
                ctx.reply('Virhetilanne');
            }
            else {
                ctx.reply('Tapahtuma luotu!');
            }
        });
    }
});
//# sourceMappingURL=pottu.js.map