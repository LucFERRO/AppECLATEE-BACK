
import {  DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {

    const concatRequiredMessage = (data : string) => {
        return `${data} is required`
    }

    return sequelize.define('User', {

        user_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        mail: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate : {
                isEmail: true, 
                notNull: { msg : concatRequiredMessage('Mail')},
                notEmpty: { msg : concatRequiredMessage('mail')}


            }
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Password')},
                notEmpty : { msg : concatRequiredMessage('Password')}
            }
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Zip code')},
                notEmpty : { msg : concatRequiredMessage('Zip code')}
            }
        },
        zip_code: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Zip code')},
                notEmpty : { msg : concatRequiredMessage('Zip code')}
            }
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Address')},
                notEmpty : { msg : concatRequiredMessage('Address')}
            }
        },
        phone_number: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : concatRequiredMessage('Zip code')},
                notEmpty : { msg : concatRequiredMessage('Zip code')}
            }
        },
        is_active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_pending: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        role: {
            type: dataTypes.STRING,
        }
    })
}
