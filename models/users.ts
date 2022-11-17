
import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `Le champ ${data} est requis.`
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
            validate: {
                isEmail: true,
                notNull: { msg: concatRequiredMessage('Email') },
                notEmpty: { msg: concatRequiredMessage('Email') }


            }
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Mot de passe') },
                notEmpty: { msg: concatRequiredMessage('Mot de passe') }
            }
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Ville') },
                notEmpty: { msg: concatRequiredMessage('Ville') }
            }
        },
        zip_code: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Code postal') },
                notEmpty: { msg: concatRequiredMessage('Code postal') }
            }
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Adresse') },
                notEmpty: { msg: concatRequiredMessage('Adresse') }
            }
        },
        phone_number: {
            type: dataTypes.STRING,
            validate: {
                isNumeric: { msg: 'Format de numéro de téléphone invalide.' }
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
        is_to_be_completed: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        role: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: dataTypes.STRING,
        },
    })
}
