import bot from "./bot"
import { Context } from "telegraf"

import "./modules/pottu"
import "./modules/lime"

bot.launch()
console.log("Should be running?")
bot.catch((err: any) => console.log(err));