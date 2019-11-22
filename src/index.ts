import bot from "./bot"
//import "./services/events"
import { Context } from "telegraf"

import "./modules/pottu"
import "./modules/lime"
import "./modules/calendar"

bot.launch()
bot.catch((err: any) => console.log(err));