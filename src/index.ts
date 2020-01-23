import bot from "./bot"

import "./modules/pottu"
import "./modules/lime"

bot.launch()
bot.catch((err: any) => console.log(err));