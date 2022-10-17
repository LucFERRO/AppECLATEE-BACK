import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { adminTypes } from "../../types/admin"

const { Admin } = require('../../database/connect')

/**
 * @openapi
 * /api/admins:
 *   get:
 *      tags: [Admins]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
module.exports = (app : Application) => {
    app.get('/api/admins', (req,res) => {
        Admin.findAll()
            .then((admins: adminTypes) => {
                res.status(200).json(admins)
            })
            .catch((error : ApiException) => {
                res.status(500).json(error)
            })
    })
}