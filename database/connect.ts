import { DataTypes } from "sequelize"
import { userTypes } from "../types/user"
let users = require('../database/mock-user')
const {Sequelize} = require('sequelize')
const UserModel = require('../models/users')

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

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error : Error) => console.error(`Could not connect to database: ${error}`)
    )

const User = UserModel(sequelize, DataTypes)

    
const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: userTypes) => {
                User.create({
                    name: user.name,
                    mail: user.mail,
                    description: user.description,
                    image: user.image,
                    role: user.role
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            console.log('Database successfully initialized.')
    })
}


module.exports = {
    initDb, User
}