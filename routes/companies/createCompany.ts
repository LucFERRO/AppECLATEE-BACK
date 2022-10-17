import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Company } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Companies
 *      description: Manage companies
 */

/**
 * @openapi
 * /api/companies:
 *  post:
 *      tags: [Companies]
 *      description: Add a company
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "name": "string","siret": "string" }
 *      responses:
 *        200:
 *          description: Create a new company.
 */
module.exports = (app: Application) => {
    app.post("/api/companies", async (req, res) => {

        Company.create(req.body)
            .then((company: companyTypes) => {
                const message: string = `Company ${company.name} successfully created.`;
                res.json({ message, data: company });
            })
            .catch((error: ApiException) => {
                if (error instanceof ValidationError) {
                    return res
                        .status(400)
                        .json({ message: error.message, data: error });
                }
                const message = `Could not create new company.`;
                res.status(500).json({ message, data: error });
            });
    });
};
