const { Sequelize } = require('sequelize')

const sequelize = new Sequelize (
    'ECLATEEtest',
    'neo',
    'neoneo',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        }
    }
)

export default sequelize