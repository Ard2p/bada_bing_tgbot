require('dotenv').config()

const DB = require('./models')
const bot = require('./bot')

// force: true
// alter: true
DB.sequelize.sync({ alter: true }).then(() => {
  console.log('Synced db.')
  bot.launch()
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message)
})

