import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
import { userTypes } from "../../types/user";

import sequelize from "../../database/sequelize";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Candidate, User } = require("../../database/connect");

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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "string" }
 *      responses:
 *        200:
 *          description: Create a new candidate.
 */
module.exports = (app: Application) => {
    app.post("/api/candidates", async (req, res) => {

        if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Password is required.",
        });

        const t = await sequelize.transaction();
        const { lastname, firstname, birthdate } = req.body
        const { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role } = req.body

        let candidateInfo = { lastname, firstname, birthdate }
        let userInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role }

        try {
            let hashedPassword = await bcrypt.hash(userInfo.password, 10);

            let userId;

            await User.create(
                { ...userInfo, password: hashedPassword },
                { transaction: t }
            )
                .then((user: userTypes) => {
                    userId = user.user_id;
                    candidateInfo = Object.assign(candidateInfo, { user_id: userId });
                })
                .catch((error: ApiException) => {
                    if (error instanceof ValidationError) {
                        return res
                            .status(400)
                            .json({ message: error.message, data: error });
                    }
                    const message = `Could not create new user.`;
                    res.status(500).json({ message, data: error });
                });

            await Candidate.create(candidateInfo, { transaction: t })
                .then((candidate: candidateTypes) => {
                    const message: string = `Candidate ${candidate.lastname} successfully created.`;
                    res.json({ message, data: candidate });
                })
                .catch((error: ApiException) => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({
                            message: error.message,
                            data: error,
                        });
                    }
                    const message = `Could not create new candidate.`;
                    res.status(500).json({ message, data: error });
                });

            await t.commit();

        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    });
};
