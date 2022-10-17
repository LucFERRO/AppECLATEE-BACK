import { Application } from "express";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";

const { Company } = require("../../database/connect");

/**
 * @openapi
 * /api/companies/{id}:
 *  get:
 *      tags: [Companies]
 *      description: Get an template by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get company of given id.
 */
module.exports = (app: Application) => {
    app.get("/api/companies/:id", (req, res) => {
        Company.findByPk(req.params.id)
            .then((company: companyTypes) => {
                if (company === null) {
                    const message = "Requested company does not exist.";
                    return res.status(404).json({ message });
                }

                const message: string = "Company found.";
                res.json({ message, data: company });
            })
            .catch((error: ApiException) => {
                const message = "Cannot find company.";
                res.status(500).json({ message, data: error });
            });
    });
};
