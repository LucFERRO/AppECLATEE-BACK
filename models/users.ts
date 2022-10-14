
import {  DataTypes, Sequelize, STRING } from "sequelize"


module.exports = (sequelize : Sequelize, dataTypes : typeof DataTypes) => {
    return sequelize.define('User', {

    
    id: {
       type: dataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true, 
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg : 'Name is required.'},
            notEmpty : {msg : 'Name cannot be empty.'}
        }
    },
    mail: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail:true, 
            notNull: {msg : 'Mail is required.'},
            notEmpty: {msg : 'Mail cannot be empty.'}


        }
    },
    description: {
        type: dataTypes.STRING,
    },
    image: {
        type: dataTypes.STRING,
        validate : {
            isUrl:true
        }
    }, 
    role: {
        type: dataTypes.STRING,
    }
})
}
