import bot from "../bot"
import stickers from "../stickers.json"

const INTERVAL = 30 * 60 * 1000
const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva', 'könnichiwa']
const HUUTIS = ['😂', 'huutista', ':d']
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
bot.on("message", ({ message, reply, replyWithSticker }) => {
    const sender = message && message.from && message.from.username
    const text = message && message.text
    const now = Date.now()

    if (sender === "Limeuz" && now >= nextTime) {
        nextTime = now + rand()
        reply("Ääääää limeeeeuz")
    }

    if (text && containsKeyword(text, SUSSIS)) {
        replyWithSticker(stickers.sussi)
    }
    
    if (text && now >= nextHuutisTime && containsKeyword(text, HUUTIS)) {
        nextHuutisTime = now + rand()
        reply(HUUTIS_ANSWERS[Math.floor(Math.random()*HUUTIS_ANSWERS.length)])
    }
})
