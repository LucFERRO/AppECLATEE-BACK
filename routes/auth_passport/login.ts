import { Application } from "express";
import { Error } from "sequelize";

const { User } = require("../../database/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const privateKey = require("../auth/private_key");


/**
 * @swagger
 * tags:
 *      name: Login
 *      description: Manage login
 */

/**
  * @openapi
  * /api/login:
  *  post:
  *      tags: [Login]
  *      description: Login
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "mail": "string", "password": "string"}
  *      responses:
  *        200:
  *          description: Login.
  */
module.exports = (app: Application) => {
    app.post("/api/login", (req, res) => {
        User.findOne({ where: { mail: req.body.mail } }).then(
            (user: typeof User) => {
                if (!user) {
                    return res.status(401).send({
                        success: false,
                        message: "Could not find mail.",
                    });
                }
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((isPasswordValid: typeof bcrypt) => {
                        if (!isPasswordValid) {
                            const message = `Incorrect password.`;
                            return res
                                .status(401)
                                .json({ message, success: false });
                        }
                        // JWT

                        const payload = {
                            name: user.name,
                            id: user.id,
                        };

                        const token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: "300s",
                        });

                        return res.status(200).send({
                            succes: true,
                            message: "Logged in successfully",
                            token: "Bearer " + token,
                            data: user
                        });
                    })
                    .catch((err: Error) => {
                        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelque instants.`;
                        return res.json({ message, data: err });
                    });
            }
        );
    });
};