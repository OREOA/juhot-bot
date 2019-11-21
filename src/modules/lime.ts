import bot from "../bot"

const INTERVAL = 30 * 60 * 1000

const rand = () => Math.random() * 5 * 60 * 60 * 1000 + 30 * 60 * 1000

let nextTime = -Infinity
bot.on("message", ({ message, reply }) => {
    const sender = message && message.from && message.from.username
    const now = Date.now()
    if (sender === "Limeuz" && now >= nextTime) {
        nextTime = now + rand()
        reply("Ääääää limeeeeuz")
    }
})
