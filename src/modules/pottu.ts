import bot from "../bot"
import stickers from "../stickers.json"

import aws from "aws-sdk"

const config = new aws.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1"
}) 

const client = new aws.Rekognition()

bot.hears(["pottu", "Pottu"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))
bot.command(["pottu", "poika"], ({ replyWithSticker }) => replyWithSticker(stickers.pottu))

bot.hears(["Glom", "glom"], ({ replyWithSticker }) => replyWithSticker(stickers.glom))
bot.command("glom", ({ replyWithSticker }) => replyWithSticker(stickers.glom))

bot.command(["photo"], ({ reply }) => {
  reply("Test")
})
