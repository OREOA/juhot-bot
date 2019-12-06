import bot from "../bot"
import stickers from "../stickers.json"

const INTERVAL = 30 * 60 * 1000
const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva', 'könnichiwa']
const HUUTIS = ['😂', 'huutista', ':d']
const HUUTIS_ANSWERS = ['😂😂😂😂', 'huutista', ':DDDD', 'huu', 'huutitata', ':--D']

const rand = () => Math.random() * 5 * 60 * 60 * 1000 + INTERVAL

const containsSussi = (text: string) => {
    for (let sussi of SUSSIS) {
        if (text.toLowerCase().includes(sussi)) {
            return true
        }
    }
    return false
}

const containsHuutista = (text: string) => {
    for (let huutis of HUUTIS) {
        if (text.toLowerCase().includes(huutis)) {
            return true
        }
    }
}

let nextTime = -Infinity
let nextHuutisTime = -Infinity
bot.on("message", ({ message, reply, replyWithSticker }) => {
    const sender = message && message.from && message.from.username
    const now = Date.now()
    if (sender === "Limeuz" && now >= nextTime) {
        nextTime = now + rand()
        reply("Ääääää limeeeeuz")
    }
    const text = message && message.text
    if (text && containsSussi(text)) {
        replyWithSticker(stickers.sussi)
    }
    if (text && now >= nextHuutisTime && containsHuutista(text)) {
        nextHuutisTime = now + rand()
        reply(HUUTIS_ANSWERS[Math.floor(Math.random()*HUUTIS_ANSWERS.length)])
    }
})
