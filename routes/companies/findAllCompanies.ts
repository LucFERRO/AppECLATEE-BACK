import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { companyTypes } from "../../types/company"

const { Company } = require('../../database/connect')

/**
 * @openapi
 * /api/companies:
 *   get:
 *      tags: [Companies]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all companies.
 */
module.exports = (app : Application) => {
    app.get('/api/companies', (req,res) => {
        Company.findAll()
        .then((companies: companyTypes) => {
            res.status(200).json(companies)
        })
        .catch((error : ApiException) => {
            res.status(500).json(error)
        })
    })
}