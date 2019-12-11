import bot from "./bot"
import nlp from "./nlp"

import "./modules/pottu"
import "./modules/lime"

bot.use(nlp.middleware())

bot.launch()
console.log("Should be running?")

bot.on('text', (ctx) => {
  console.log('here')
  const message = ctx.message ? ctx.message.text : 'no'
  return nlp.getMeaning(message)
    .then((result: any) => {
      // reply to user with wit result
      return ctx.reply(JSON.stringify(result, null, 2))
    })
})

bot.catch((err: any) => console.log(err));