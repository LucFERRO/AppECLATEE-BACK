import { Application } from "express"
import { Error } from "sequelize"
import { ApiException } from "../../types/exception"
import { candidateTypes } from "../../types/candidate"

const { Candidate } = require('../../database/connect')

/**
 * @openapi
 * /api/candidates:
 *   get:
 *      tags: [Candidates]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
module.exports = (app : Application) => {
    app.get('/api/candidates', (req,res) => {
        Candidate.findAll()
        .then((candidates: candidateTypes) => {
            res.status(200).json(candidates)
        })
        .catch((error : ApiException) => {
            res.status(500).json(error)
        })
    })
}