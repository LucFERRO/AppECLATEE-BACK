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

        const { lastname, firstname, birthdate } = req.body;
        const {
            mail,
            city,
            zip_code,
            address,
            phone_number,
            is_active,
            is_pending,
            role,
        } = req.body;

        let candidateInfo = { lastname, firstname, birthdate };
        let userInfo = {
            mail,
            city,
            zip_code,
            address,
            phone_number,
            is_active,
            is_pending,
            role,
        };

        if (req.body.password) {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            userInfo = Object.assign(userInfo, { password: hashedPassword });
        }

        const t = await sequelize.transaction();
        try {
            await Candidate.update(
                candidateInfo,
                { where: { id: id } },
                { transaction: t }
            );
            // .then(() => {
            //     Candidate.findByPk(id).then((candidate: candidateTypes) => {
            //     console.log('Candidatedsqflmskdlsqjdlqsk',candidate)
            //     if (candidate === null) {
            //         const message = "Requested candidate does not exist.";
            //         return res.status(404).json({ message });
            //     }

            //     // userId = candidate.user_id
            //     // candidateInfo = Object.assign(candidateInfo, { user_id: userId });
            //     // console.log('userid:', userId)
            //     return candidate.user_id
            //     })
            // })
            // .catch((error: ApiException) => {
            //     if (error instanceof ValidationError) {
            //         return res
            //             .status(400)
            //             .json({ message: error.message, data: error });
            //     }
            //     const message = `Could not update candidate.`;
            //     res.status(500).json({ message, data: error });
            // });

            let userId = await Candidate.findByPk(id);

            console.log("userId:", userId.dataValues.user_id);

            await User.update(
                userInfo,
                {
                    where: { user_id: 'ccc' },
                },
                {
                    transaction: t,
                }
            ).then((user: userTypes) => {
                console.log(user)

                const message: string = `User successfully updated.`;
                res.json({ message, data: user });
            })
            .catch((error: ApiException) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({
                        message: error.message,
                        data: error,
                    });
                }

                const message = `Could not update user.`;
                res.status(500).json({ message, data: error });
            });
            
        await t.commit();
        } 
        catch (error) {
            console.log(error);
            await t.rollback();
        }
    });
};

// Candidate.update(
//     {
//         lastname: lastname,
//         firstname: firstname,
//         birthdate: birthdate,
//     },
//     {
//         where: { id: id },
//     }
// )
//     .then(() => {
//         return Candidate.findByPk(id).then(
//             (candidate: candidateTypes) => {
//                 if (candidate === null) {
//                     const message =
//                         "Requested candidate does not exist.";
//                     return res.status(404).json({ message });
//                 }
//                 const message = `Candidate ${candidate.id} successfully updated`;
//                 res.json({ message, data: candidate });
//             }
//         );
//     })
//     .catch((error: ApiException) => {
//         if (error instanceof ValidationError) {
//             return res.status(400).json({ message: error.message, data: error });
//         }
//         const message = `Could not update the candidate.`;
//         res.status(500).json({ message, data: error });
//     });

//     };
// };
