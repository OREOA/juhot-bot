import bot from "../bot"
import stickers from "../stickers.json"

const TWO_DAYS = 48 * 60 * 60 * 1000
const INTERVAL = 30 * 60 * 1000
const ANA_PEOPLE = ['Peussan', 'Juhon', 'Nässin', 'Limen', 'Rikun']
const ANA_SUBJECT = ['opinnoista', 'töistä', 'naisista']
const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva', 'könnichiwa']
const HUUTIS = ['😂', 'huutista', ':d']
const BAD_WORDS = ['vittu', 'vitun', 'paska', 'helvetti', 'helvetin', 'saatana', 'saatanan']
const HUUTIS_ANSWERS = ['😂😂😂😂', 'huutista', ':DDDD', 'huu', 'huutitata', ':--D']
const GOOD_BOT = ['good bot', 'hyvä botti']
const BAD_BOT = ['bad bot', 'shit bot', 'paska botti']

const rand = () => Math.random() * 5 * 60 * 60 * 1000 + INTERVAL

const containsKeyword = (text:string, keywords: Array<string>) => {
    for (let keyword of keywords) {
        if (text.toLowerCase().includes(keyword)) {
            return true
        }
    }
    return false
}

const initializeAna = (reply: Function, replyWithSticker: Function):NodeJS.Timeout => {
    return setTimeout(() => {
        heiHei(reply, replyWithSticker)
        return initializeAna(reply, replyWithSticker)
    }, Math.random()*TWO_DAYS)
}

const heiHei = (reply: Function, replyWithSticker: Function) => {
    replyWithSticker(stickers.ana)
    setTimeout(() => {
        reply("Hei hei")
    }, 2000)
    const peopleIndex = Math.floor(Math.random()*ANA_PEOPLE.length)
    const subjectIndex = Math.floor(Math.random()*ANA_SUBJECT.length)
    setTimeout(() => {
        reply(`Olisiko teillä hetki aika puhua ${ANA_PEOPLE[peopleIndex]} ${ANA_SUBJECT[subjectIndex]}?`)
    }, 4000)
}

let ana: NodeJS.Timeout | null = null

let nextTime = -Infinity
let nextHuutisTime = -Infinity
let nextBadWordTime = -Infinity
bot.on("message", ({ message, reply, replyWithSticker }) => {
    // idk how to do this the smart way
    if (!ana) {
        ana = initializeAna(reply, replyWithSticker)
    }

    const sender = message && message.from && message.from.username
    const text = message && message.text
    const now = Date.now()

    if (sender === "Limeuz" && now >= nextTime) {
        nextTime = now + rand()
        setTimeout(() => {
            reply("Ääääää limeeeeuz")
        }, 500 + Math.random()*2000)
        
    }

    if (text && containsKeyword(text, SUSSIS)) {
        setTimeout(() => {
            replyWithSticker(stickers.sussi)
        }, 500 + Math.random()*1000)
        
    }

    if (text && now >= nextHuutisTime && Math.random() < 0.5 && containsKeyword(text, HUUTIS)) {
        nextHuutisTime = now + rand()
        setTimeout(() => {
            reply(HUUTIS_ANSWERS[Math.floor(Math.random()*HUUTIS_ANSWERS.length)])
        }, 500 + Math.random()*10000)
    }


    if (text && containsKeyword(text, BAD_BOT)) {
        console.log("Bad bot said")
        reply("haista paska")
    } else if (text && now >= nextBadWordTime && Math.random() < 0.5 && containsKeyword(text, BAD_WORDS)) {
        nextBadWordTime = now + rand()
        setTimeout(() => {
            reply(`@${sender} lopeta toi vitun kiroilu`)
        }, 300 + Math.random()*700)
    }

    if (text && containsKeyword(text, GOOD_BOT)) {
        console.log("Good bot said")
        reply("kiitos")
    }
})
