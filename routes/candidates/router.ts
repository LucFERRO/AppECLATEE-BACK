const { Router } = require('express')

import { handlerCandidate } from './handler'

export const candidateRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Candidates
 *      description: Manage candidates
 */


/**
 * @openapi
 * /api/candidates:
 *   get:
 *      tags: [Candidates]
 *      description: Get the list of all candidates.
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
candidateRouter.get('/', handlerCandidate.getAllCandidates)

/**
 * @openapi
 * /api/candidates/{id}:
 *  get:
 *      tags: [Candidates]
 *      description: Get a candidate by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get candidate of given id.
 */
candidateRouter.get('/:id', handlerCandidate.getCandidateById)

/**
 * @openapi
 * /api/candidates:
 *  post:
 *      tags: [Candidates]
 *      description: Add a candidate
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "string" }
 *      responses:
 *        200:
 *          description: Create a new candidate.
 */
candidateRouter.post('/', handlerCandidate.createCandidate)

/**
 * @openapi
 * /api/candidates/{id}:
 *  put:
 *      tags: [Candidates]
 *      description: Update an candidate
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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "string" }
 *      responses:
 *        200:
 *          description: Update candidate of given id.
 */
candidateRouter.put('/:id', handlerCandidate.updateCandidate)

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
candidateRouter.delete('/:id', handlerCandidate.deleteCandidate)