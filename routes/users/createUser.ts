import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../database/connect')

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Manage users
 */

/**
  * @openapi
  * /api/users:
  *  post:
  *      tags: [Users]
  *      description: Add an user
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "mail": "email@email.fr","password":"string","is_active": "boolean","zip_code": "string", "city" : "string", "phone_number" : "string" }
  *      responses:
  *        200:
  *          description: Create a new user.
  */
module.exports = (app: Application) => {
  app.post("/api/users", async (req, res) => {
    const { mail, is_active, zip_code, city, phone_number } = req.body

    if (!req.body.password) return res.status(400).json({passwordRequired: true,message : 'Password is required.'})

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({ 
        mail : mail, 
        password : hashedPassword,
        is_active : is_active,
        zip_code : zip_code,
        city : city,
        phone_number : phone_number

    }).then((user: userTypes) => {
        const message: string = `User ${user.mail} successfully created.`;
        res.json({ message, data: user });
        })
        .catch((error : ApiException) => {
        if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
        }
        const message = `Could not create new user.`
        res.status(500).json({message, data : error})
    })
  });
};
