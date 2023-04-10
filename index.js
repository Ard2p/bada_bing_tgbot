require('dotenv').config()

const DB = require('./models')
const bot = require('./bot')


DB.sequelize.sync().then(() => {
  console.log('Synced db.')
  bot.launch()
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message)
})

