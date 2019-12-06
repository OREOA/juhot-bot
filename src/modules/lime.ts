import bot from "../bot"
import stickers from "../stickers.json"

const INTERVAL = 30 * 60 * 1000
const SUSSIS = ['sussi', 'sushi', 'könnitsiva', 'konnichiwa', 'konnitsiva', 'könnichiwa']

const rand = () => Math.random() * 5 * 60 * 60 * 1000 + INTERVAL

const containsSussi = (text: string) => {
    for (let sussi of SUSSIS) {
        if (text.toLowerCase().includes(sussi)) {
            return true
        }
    }
    return false
}

let nextTime = -Infinity
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
})
