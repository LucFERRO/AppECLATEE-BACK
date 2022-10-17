import { Application } from "express";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";

const { Candidate } = require('../../database/connect')
  

/**
  * @openapi
  * /api/candidates/{id}:
  *  delete:
  *      tags: [Candidates]
  *      description: Delete a candidate
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: Delete a candidate. 
  */
module.exports = (app :Application) => {
  app.delete('/api/companies/:id', (req, res) => {
    Candidate.findByPk(req.params.id).then((candidate: candidateTypes) => {
      if (candidate === null){
        const message = "Requested user does not exist."
        return res.status(404).json({message : message})
      }

      const deletedCandidate = candidate;
     return  Candidate.destroy({
        where: { id: candidate.id }
      })
      .then(() => {
        const message = `Company ${deletedCandidate.id} successfully deleted.`
        res.json({message, data: deletedCandidate })
      })
    })
    .catch((error: ApiException) => {
      const message = `Could not delete candidate.`;
      res.status(500).json({ message, data: error });
    });
  })
}