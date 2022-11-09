const { Router } = require('express')

import { handlerCompany } from './handler'

export const companyRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Companies
 *      description: Manage companies
 */

/**
 * @openapi
 * /api/companies:
 *   get:
 *      tags: [Companies]
 *      description: Get the list of all companies.
 *      responses:
 *        200:
 *          description: Get the list of all companies.
 */
companyRouter.get('/', handlerCompany.getAllCompanies)

/**
 * @openapi
 * /api/companies/{id}:
 *  get:
 *      tags: [Companies]
 *      description: Get a company by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get company of given id.
 */
companyRouter.get('/:id', handlerCompany.getCompanyById)

/**
 * @openapi
 * /api/companies:
 *  post:
 *      tags: [Companies]
 *      description: Add a company
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "name": "string", "siret": "string" }
 *      responses:
 *        200:
 *          description: Create a new company.
 */
companyRouter.post('/', handlerCompany.createCompany)

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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "name": "string", "siret": "string" }
 *      responses:
 *        200:
 *          description: Update company of given id.
 */
companyRouter.put('/:id', handlerCompany.updateCompany)

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
 *         default: 1
 *      responses:
 *        200:
 *          description: Delete a company.
 */
companyRouter.delete('/:id', handlerCompany.deleteCompany)