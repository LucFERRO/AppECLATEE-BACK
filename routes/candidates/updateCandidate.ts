import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
import { userTypes } from "../../types/user";

import sequelize from "../../database/sequelize";

const bcrypt = require("bcrypt");

const { Candidate, User } = require("../../database/connect");

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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "string" }
 *      responses:
 *        200:
 *          description: Update candidate of given id.
 */
module.exports = (app: Application) => {
    app.put("/api/candidates/:id", async (req, res) => {
        const id = req.params.id;

        const { lastname, firstname, birthdate, mail, city, zip_code, address, phone_number, is_active, is_pending, role } = req.body;

        let candidateInfo = { lastname, firstname, birthdate };
        let userInfo = { mail, city, zip_code, address, phone_number, is_active, is_pending, role };

        if (req.body.password) {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            userInfo = Object.assign(userInfo, { password: hashedPassword });
        }

        try {
            await sequelize.transaction(async (t : any) => {
                const updatedCandidate: any = await Candidate.update(
                    candidateInfo,
                    {
                        where: { id: id },
                        returning: true,
                        plain: true,
                        transaction: t,
                    }
                );

                await User.update(userInfo, {
                    where: { user_id: updatedCandidate[1].user_id },
                    returning: true,
                    plain: true,
                    transaction: t,
                });
                return res.status(200).json(updatedCandidate[1]);
            });
        } catch (error) {
            return res.status(500).json("ERREUR 500");
        }
    });
};
