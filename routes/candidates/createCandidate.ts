import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
import { userTypes } from "../../types/user";

import sequelize from "../../database/sequelize";

// const { Sequelize } = require('sequelize')
// const sequelize2 = new Sequelize (
//     'ECLATEEtest',
//     'neo',
//     'neoneo',
//     {
//         host:'localhost',
//         dialect:'postgres',
//         port: 5432,
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         }
//     }
// )

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
        const t = await sequelize.transaction();

        if (!req.body.password)
            return res.status(400).json({
                passwordRequired: true,
                message: "Password is required.",
            });
        try {

            // sequelize.transaction(async (t: any) => {

                let hashedPassword = await bcrypt.hash(req.body.password, 10);

                console.log('avant quoi que ce soit')
                
                let userId 
                let newBody

                await User.create({...req.body,password: hashedPassword},{ transaction: t })
                    // .then((response : Response) => console.log('dans create user',response))
                    .then((user: userTypes) => {
                        userId = user.user_id
                        newBody = Object.assign(req.body, { user_id: userId })
                        // const message: string = `User ${user.mail} successfully created.`;
                        // res.json({ message, data: user });
                    })
                    // .catch((error: ApiException) => {
                    //     if (error instanceof ValidationError) {
                    //         return res
                    //             .status(400)
                    //             .json({ message: error.message, data: error });
                    //     }
                    //     const message = `Could not create new user.`;
                    //     res.status(500).json({ message, data: error });
                    // });

                console.log(userId)
                console.log(newBody)

                await Candidate.create(
                    // Object.assign(req.body, { user_id: userId })
                    newBody
                    // req.body
                    ,{ transaction: t })
                    //   .then((response : Response) => console.log('dans create candidate',response))
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

                    // return user
                    // });
                    
                    // If the execution reaches this line, no errors were thrown.
                    // We commit the transaction.
                    await t.commit();
                    // throw new Error()
        } catch (error) {
            console.log(error)
            // If the execution reaches this line, an error was thrown.
            // We rollback the transaction.
            await t.rollback();
        }

        // Candidate.create(req.body)
        //     .then((candidate: candidateTypes) => {
        //         const message: string = `Candidate ${candidate.lastname} successfully created.`;
        //         res.json({ message, data: candidate });
        //     })
        //     .catch((error: ApiException) => {
        //         if (error instanceof ValidationError) {
        //             return res
        //                 .status(400)
        //                 .json({ message: error.message, data: error });
        //         }
        //         const message = `Could not create new candidate.`;
        //         res.status(500).json({ message, data: error });
        //     });
    });
};
