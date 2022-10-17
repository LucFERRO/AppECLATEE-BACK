import { Application } from "express";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";

const { Company } = require('../../database/connect')
  

/**
  * @openapi
  * /api/companies/{id}:
  *  delete:
  *      tags: [Companies]
  *      description: Delete a company
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: Delete a company. 
  */
module.exports = (app :Application) => {
  app.delete('/api/companies/:id', (req, res) => {
    Company.findByPk(req.params.id).then((company: companyTypes) => {
      if (company === null){
        const message = "Requested user does not exist."
        return res.status(404).json({message : message})
      }

      const deletedCompany = company;
     return  Company.destroy({
        where: { id: company.id }
      })
      .then(() => {
        const message = `Company ${deletedCompany.id} successfully deleted.`
        res.json({message, data: deletedCompany })
      })
    })
    .catch((error: ApiException) => {
      const message = `Could not delete company.`;
      res.status(500).json({ message, data: error });
    });
  })
}