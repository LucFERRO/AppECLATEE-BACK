import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
const bcrypt = require("bcrypt");

const { Candidate } = require("../../database/connect");

/**
 * @openapi
 * /api/candidates/{id}:
 *  put:
 *      tags: [Candidates]
 *      description: Update an candidate
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "lastname": "string", "firstname": "string", "birthdate": "string" }
 *      responses:
 *        200:
 *          description: Update candidate of given id.
 */
module.exports = (app: Application) => {
    app.put("/api/candidates/:id", async (req, res) => {
        const id = req.params.id;
        const { lastname, firstname, birthdate } = req.body;

        Candidate.update(
            {
                lastname: lastname,
                firstname: firstname,
                birthdate: birthdate,
            },
            {
                where: { id: id },
            }
        )
            .then(() => {
                return Candidate.findByPk(id).then(
                    (candidate: candidateTypes) => {
                        if (candidate === null) {
                            const message =
                                "Requested candidate does not exist.";
                            return res.status(404).json({ message });
                        }
                        const message = `Candidate ${candidate.id} successfully updated`;
                        res.json({ message, data: candidate });
                    }
                );
            })
            .catch((error: ApiException) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message = `Could not update the candidate.`;
                res.status(500).json({ message, data: error });
            });
    });
};
