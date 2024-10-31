import { Application } from "express"
import { availabilityTypes } from "../../types/availability"
import { ApiException } from "../../types/exception"

const { Availability } = require('../../database/connect')

/**
 * @openapi
 * /api/availabilities:
 *   get:
 *      tags: [Availabilities]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all availabilities.
 */
module.exports = (app: Application) => {
    app.get('/api/availabilities', (req, res) => {
        Availability.findAll()
            .then((availabilities: availabilityTypes) => {
                res.status(200).json(availabilities)
            })
            .catch((error: ApiException) => {
                res.status(500).json(error)
            })
    })
}