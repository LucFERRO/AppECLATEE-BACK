import { Application } from "express";
import { Error } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";

const { Candidate, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

/**
 * @openapi
 * /api/candidates:
 *   get:
 *      tags: [Candidates]
 *      description: Get the list of all candidates.
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
module.exports = (app: Application) => {
    app.get("/api/candidates", async (req, res) => {
        await Candidate.findAll({
            include: [User]
        })
            .then((candidates: candidateTypes) => {
                res.status(200).json(DTO(candidates));
            })
            .catch((error: ApiException) => {
                res.status(500).json(error);
            });
    });
};
