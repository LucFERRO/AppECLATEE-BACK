import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { adminTypes } from "../../types/admin";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Admin } = require("../../database/connect");

/**
 * @swagger
 * tags:
 *      name: Admins
 *      description: Manage admins
 */

/**
 * @openapi
 * /api/admins:
 *  post:
 *      tags: [Admins]
 *      description: Add an admin
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "lastname": "string","firstname":"string" }
 *      responses:
 *        200:
 *          description: Create a new admin.
 */
module.exports = (app: Application) => {
    app.post('/api/admins', async (req, res) => {
        Admin.create(req.body)
            .then((admin: adminTypes) => {
                const message: string = `Admin ${admin.lastname} successfully created.`;
                res.json({ message, data: admin });
            })
            .catch((error: ApiException) => {
                if (error instanceof ValidationError)
                    return res
                        .status(400)
                        .json({ message: error.message, data: error });
                const message = `Could not create new admin.`;
                res.status(500).json({ message, data: error });
            });
    });
};
