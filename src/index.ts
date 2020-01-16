import bot from "./bot"
import db from './db'

import "./modules/pottu"
import "./modules/lime"

bot.launch()
db.authenticate()
.then(() => {
  console.log('DB OK')
})
.catch((err: any) => {
  console.error('DB ERROR', err)
})
console.log("Should be running?")
bot.catch((err: any) => console.log(err))