import bot from "../bot"
import stickers from "../stickers.json"

const INTERVAL = 30 * 60 * 1000
const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva', 'könnichiwa']
const HUUTIS = ['😂', 'huutista', ':d']
const BAD_WORDS = ['vittu', 'vitun', 'paska', 'helvetti', 'helvetin', 'saatana', 'saatanan']
const HUUTIS_ANSWERS = ['😂😂😂😂', 'huutista', ':DDDD', 'huu', 'huutitata', ':--D']

const rand = () => Math.random() * 5 * 60 * 60 * 1000 + INTERVAL

const containsKeyword = (text:string, keywords: Array<string>) => {
    for (let keyword of keywords) {
        if (text.toLowerCase().includes(keyword)) {
            return true
        }
    }
    return false
}

let nextTime = -Infinity
let nextHuutisTime = -Infinity
let nextBadWordTime = -Infinity
bot.on("message", ({ message, reply, replyWithSticker }) => {
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

    if (text && now >= nextBadWordTime && Math.random() < 0.5 && containsKeyword(text, BAD_WORDS)) {
        nextBadWordTime = now + rand()
        setTimeout(() => {
            reply(`@${sender} lopeta toi vitun kiroilu`)
        }, 300 + Math.random()*700)
    }
})
