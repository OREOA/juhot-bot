import bot from "../bot"
import stickers from "../stickers.json"
import Shortcut from "../models/shortcuts"

Shortcut.findAll().then((e:any) => {
  console.log(e)
})


bot.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))
bot.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))

bot.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers.glom))
bot.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers.glom))
