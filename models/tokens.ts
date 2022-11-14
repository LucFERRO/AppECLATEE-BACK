
import { DataTypes, Sequelize, STRING } from "sequelize"


module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is requis`
    }

    return sequelize.define('Token', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        refreshToken: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Token') },
                notEmpty: { msg: concatRequiredMessage('Token') }
            }
        },
    })
}
