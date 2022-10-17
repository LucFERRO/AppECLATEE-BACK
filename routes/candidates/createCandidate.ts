import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Candidate } = require('../../database/connect')

/**
 * @swagger
 * tags:
 *      name: Candidates
 *      description: Manage candidates
 */

/**
  * @openapi
  * /api/candidates:
  *  post:
  *      tags: [Candidates]
  *      description: Add an candidate
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "lastname": "string", "firstname": "string", "birthdate": "string" }
  *      responses:
  *        200:
  *          description: Create a new candidate.
  */
module.exports = (app: Application) => {
  app.post("/api/candidates", async (req, res) => {
    const { lastname, firstname, birthdate } = req.body

    Candidate.create({ 
        lastname : lastname, 
        firstname : firstname,
        birthdate : birthdate

    }).then((candidate: candidateTypes) => {
        const message: string = `Candidate ${candidate.lastname} successfully created.`;
        res.json({ message, data: candidate });
        })
        .catch((error : ApiException) => {
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
        }
        const message = `Could not create new candidate.`
        res.status(500).json({message, data : error})
    })
  });
};
