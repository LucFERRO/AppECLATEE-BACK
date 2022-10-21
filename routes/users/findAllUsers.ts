import { Application } from "express";
import { Error } from "sequelize";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";

const { User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

/**
 * @openapi
 * /api/users:
 *   get:
 *      tags: [Users]
 *      description: Get the list of all users.
 *      responses:
 *        200:
 *          description: Get the list of all users.
 */
module.exports = (app: Application) => {
    app.get("/api/users", (req, res) => {
        User.findAll({
            order: ['user_id'], 
            attributes: ['user_id','mail','city','zip_code','address','phone_number','is_active','is_pending','role','createdAt','updatedAt']
    })
            .then((users: userTypes) => {
                res.status(200).json(DTO(users));
            })
            .catch((error: ApiException) => {
                res.status(500).json(error);
            });
    });
};
