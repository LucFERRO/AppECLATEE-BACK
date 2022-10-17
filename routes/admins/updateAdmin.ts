import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { adminTypes } from "../../types/admin";
const bcrypt = require('bcrypt')

const { Admin } = require('../../database/connect')

/**
  * @openapi
  * /api/admins/{id}:
  *  put:
  *      tags: [Admins]
  *      description: Update an admin
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
  *         default: { "lastname": "string","firstname": "string" }
  *      responses:
  *        200:
  *          description: Update admin of given id.
  */
module.exports = (app: Application) => {
  app.put("/api/admins/:id", async (req, res) => {
    const id = req.params.id;
    const { lastname, firstname } = req.body

    Admin.update({ 
        lastname : lastname, 
        firstname : firstname
    }, {
      where: { id: id },
    })
      .then(() => {
       return Admin.findByPk(id).then((admin: adminTypes) => {
          if (admin === null){
            const message = "Requested admin does not exist."
            return res.status(404).json({message})
          }
            const message = `Admin ${admin.id} successfully updated`;
            res.json({ message, data: admin });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Could not update the admin.`;
        res.status(500).json({ message, data: error });
      });
  });
};
