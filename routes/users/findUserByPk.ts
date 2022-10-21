import { Application } from "express";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";

const { User } = require("../../database/connect");

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      tags: [Users]
 *      description: Get an template by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get user of given id.
 */
module.exports = (app: Application) => {
    app.get("/api/users/:id", (req, res) => {
        User.findOne({
            where: {user_id : req.params.id}, 
            attributes: ['user_id','mail','city','zip_code','address','phone_number','is_active','is_pending','role','createdAt','updatedAt']
        })
            .then((user: userTypes) => {
                if (user === null) {
                    const message = "Requested user does not exist.";
                    return res.status(404).json({ message });
                }

                res.json(user);
            })
            .catch((error: ApiException) => {
                const message = "Cannot find user.";
                res.status(500).json({ message, data: error });
            });
    });
};
