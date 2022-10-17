import { Application } from "express";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";

const { User } = require('../../database/connect')
  

/**
  * @openapi
  * /api/users/{id}:
  *  delete:
  *      tags: [Users]
  *      description: Delete an user.
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: Delete an user. 
  */
module.exports = (app :Application) => {
  app.delete('/api/users/:id', (req, res) => {
    User.findByPk(req.params.id).then((user: userTypes) => {
      if (user === null){
        const message = "Requested user does not exist."
        return res.status(404).json({message : message})
      }

      const deletedUser = user;
     return  User.destroy({
        where: { id: user.id }
      })
      .then(() => {
        const message = `User ${deletedUser.id} successfully deleted.`
        res.json({message, data: deletedUser })
      })
    })
    .catch((error: ApiException) => {
      const message = `Could not delete user.`;
      res.status(500).json({ message, data: error });
    });
  })
}