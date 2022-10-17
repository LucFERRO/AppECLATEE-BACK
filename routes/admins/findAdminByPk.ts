import { Application } from "express"
import { ApiException } from "../../types/exception"
import { adminTypes } from "../../types/admin"

const { Admin } = require('../../database/connect')
  
/**
  * @openapi
  * /api/admins/{id}:
  *  get:
  *      tags: [Admins]
  *      description: Get an template by id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: Get admin of given id.
  */
module.exports = (app : Application) => {
  app.get('/api/admins/:id', (req, res) => {
    Admin.findByPk(req.params.id)
      .then((admin : adminTypes )=> {
        if (admin === null){
          const message = "Requested admin does not exist."
          return res.status(404).json({message})
        }

        const message : string = 'Admin found.'
        res.json({ message, data: admin })
      })
      .catch((error : ApiException ) => {
        const message = "Cannot find admin."
        res.status(500).json({message, data: error})
      })
  })
}