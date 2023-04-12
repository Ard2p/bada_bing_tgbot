module.exports = (sequelize, Sequelize) => {
    const Gift = sequelize.define('gifts', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tg_id: {
            type: Sequelize.STRING,
        },
        gift: {
            type: Sequelize.STRING,
        }
    }, {
        indexes: [{
            unique: false,
            fields: ['tg_id']
        }]
    })

    return Gift
}