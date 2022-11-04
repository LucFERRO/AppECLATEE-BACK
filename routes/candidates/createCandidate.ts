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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "lastname": "string", "firstname": "string", "birthdate": "string" }
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

        const { lastname, firstname, birthdate, password, mail, city, zip_code, address, phone_number, is_active, is_pending } = req.body;

        let role = 'candidat'

        let candidateInfo = { lastname, firstname, birthdate }
        let userInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role }

        let hashedPassword = await bcrypt.hash(userInfo.password, 10);

        try {
            await sequelize.transaction(async (t : any) => {

            const newUser = await User.create(
                { ...userInfo, password: hashedPassword },
                { transaction: t }
            )
            
            candidateInfo = Object.assign(candidateInfo, { user_id: newUser.user_id });
            // Heritage "user_id = id"

            const newCandidate = await Candidate.create(candidateInfo, { transaction: t })
            return res.status(200).json(newCandidate)
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    });
};
