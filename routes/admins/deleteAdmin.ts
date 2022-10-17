import { Application } from "express";
import { ApiException } from "../../types/exception";
import { adminTypes } from "../../types/admin";

const { Admin } = require('../../database/connect')
  

/**
  * @openapi
  * /api/admins/{id}:
  *  delete:
  *      tags: [Admins]
  *      description: Delete a admin
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: Delete an admin. 
  */
module.exports = (app :Application) => {
    app.delete('/api/admins/:id', (req, res) => {
        Admin.findByPk(req.params.id)
        .then((admin: adminTypes) => {
            if (admin === null){
                const message = "Requested admin does not exist."
                return res.status(404).json({message : message})
            }
            const deletedAdmin = admin;
            return  Admin.destroy({ where: { id: admin.id } })
                        .then(() => {
                            const message = `Admin ${deletedAdmin.id} successfully deleted.`
                            res.json({message, data: deletedAdmin })
                        })
        })
        .catch((error: ApiException) => {
            const message = `Could not delete candidate.`;
            res.status(500).json({ message, data: error });
        });
    })
}