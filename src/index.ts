import bot from "./bot"
import { Context } from "telegraf"

import "./modules/pottu"
import "./modules/lime"

bot.launch()
bot.catch((err: any) => console.log(err));