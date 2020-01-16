const Sequelize = require('sequelize')
import config from "./config"

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = config

const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

export default database