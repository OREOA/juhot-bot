const database = require('../db.js')
const Sequelize = require('sequelize')

const Shortcut = database.define('shortcut', {
  shortcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sticker: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Shortcut