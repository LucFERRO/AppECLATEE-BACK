import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";
const bcrypt = require('bcrypt')

const { Company } = require('../../database/connect')

/**
  * @openapi
  * /api/companies/{id}:
  *  put:
  *      tags: [Companies]
  *      description: Update a company
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
  *         default: { "lastname": "string", "firstname": "string", "birthdate": "string" }
  *      responses:
  *        200:
  *          description: Update company of given id.
  */
module.exports = (app: Application) => {
  app.put("/api/companies/:id", async (req, res) => {
    const id = req.params.id;
    const { lastname, firstname, birthdate } = req.body

    Company.update({ 
        lastname : lastname, 
        firstname : firstname,
        birthdate : birthdate
    }, {
      where: { id: id },
    })
      .then(() => {
       return Company.findByPk(id).then((company: companyTypes) => {
          if (company === null){
            const message = "Requested company does not exist."
            return res.status(404).json({message})
          }
            const message = `Company ${company.id} successfully updated`;
            res.json({ message, data: company });
          })
      })
      .catch((error: ApiException) => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data : error})
        }
        const message = `Could not update the company.`;
        res.status(500).json({ message, data: error });
      });
  });
};
