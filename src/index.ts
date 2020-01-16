import bot from "./bot"
import db from './db'

import "./modules/pottu"
import "./modules/lime"

bot.launch()
db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});
console.log("Should be running?")
bot.catch((err: any) => console.log(err));