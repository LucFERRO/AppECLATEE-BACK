import { Application } from "express";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";

const { Candidate, User } = require("../../database/connect");

/**
 * @openapi
 * /api/candidates/{id}:
 *  get:
 *      tags: [Candidates]
 *      description: Get an template by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get candidate of given id.
 */
module.exports = (app: Application) => {
    app.get("/api/candidates/:id", (req, res) => {
        Candidate.findByPk(req.params.id,{include: [User]})
            .then((candidate: candidateTypes) => {
                if (candidate === null) {
                    const message = "Requested candidate does not exist.";
                    return res.status(404).json({ message });
                }

                const message: string = "Candidate found.";
                res.json({ message, data: candidate });
            })
            .catch((error: ApiException) => {
                const message = "Cannot find candidate.";
                res.status(500).json({ message, data: error });
            });
    });
};
