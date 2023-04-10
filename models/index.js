const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    //   pool: {
    //     max: dbConfig.pool.max,
    //     min: dbConfig.pool.min,
    //     acquire: dbConfig.pool.acquire,
    //     idle: dbConfig.pool.idle
    //   }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.js')(sequelize, Sequelize)
db.gift = require('./gift.js')(sequelize, Sequelize)

module.exports = db