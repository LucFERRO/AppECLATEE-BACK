import { Application } from "express";
import { resolve } from "path";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
const bcrypt = require("bcrypt");

const { User } = require("../../database/connect");

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags: [Users]
 *      description: Update an user
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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "boolean", "is_pending": "boolean", "zip_code": "string", "city" : "string", "phone_number" : "string", "role" : "string" }
 *      responses:
 *        200:
 *          description: Update user of given id.
 */
module.exports = (app: Application) => {
    app.put("/api/users/:id", async (req, res) => {
        const id = req.params.id;

        if (!req.body.password)
            return res
                .status(400)
                .json({
                    passwordRequired: true,
                    message: "Password is required.",
                });

        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.update(
            { ...req.body, password: hashedPassword },
            {
                where: { user_id: id },
            }
        )
            .then(() => {
                return User.findByPk(id).then((user: userTypes) => {
                    if (user === null) {
                        const message = "Requested user does not exist.";
                        return res.status(404).json({ message });
                    }
                    const message = `User ${user.user_id} successfully updated`;
                    res.json({ message, data: user });
                });
            })
            .catch((error: ApiException) => {
                if (error instanceof ValidationError) {
                    return res
                        .status(400)
                        .json({ message: error.message, data: error });
                }
                const message = `Could not update the user.`;
                res.status(500).json({ message, data: error });
            });
    });
};
