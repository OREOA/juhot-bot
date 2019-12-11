import TelegrafWit from "telegraf-wit"
import config from "./config"

const { WIT_TOKEN } = config

if (!WIT_TOKEN) {
    throw new Error("No WIT_TOKEN specified")
}

const nlp = new TelegrafWit(WIT_TOKEN)

export default nlp