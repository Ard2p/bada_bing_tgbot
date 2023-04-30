module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tg_id: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['tg_id']
        },{
            unique: true,
            fields: ['phone']
        }]
    })
   
    return User
}