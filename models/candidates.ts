
import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {

    const concatRequiredMessage = (data : string) => {
        return `${data} is required`
    }

    return sequelize.define('Candidate', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Lastname')},
                notEmpty : { msg : concatRequiredMessage('Lastname')}
            }
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Firstname')},
                notEmpty : { msg : concatRequiredMessage('Firstname')}
            }
        },
        birthdate: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Birthdate')},
                notEmpty : { msg : concatRequiredMessage('Birthdate')}
            }
        }
    },
    {
        timestamps: false
    })
}
