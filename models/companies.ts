
import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {

    const concatRequiredMessage = (data : string) => {
        return `${data} is required`
    }

    return sequelize.define('Company', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Name')},
                notEmpty : { msg : concatRequiredMessage('Name')}
            }
        },
        siret: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('SIRET')},
                notEmpty : { msg : concatRequiredMessage('SIRET')}
            }
        },

    },
    {
        timestamps: false
    })
}
