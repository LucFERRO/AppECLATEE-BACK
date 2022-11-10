const { Router } = require('express')

import { handlerAdmin } from './handler'
import { authorization } from '../../middleware/authorizations'

export const adminRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Admins
 *      description: Manage admins
 */

/**
 * @openapi
 * /api/admins:
 *   get:
 *      tags: [Admins]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
adminRouter.get('/'
, authorization
, handlerAdmin.getAllAdmins)

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
adminRouter.get('/:id'
// , authenticateToken
, handlerAdmin.getAdminById)

/**
 * @openapi
 * /api/admins:
 *  post:
 *      tags: [Admins]
 *      description: Add an admin
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "description" : "", avatar: "Oui" }
 *      responses:
 *        200:
 *          description: Create a new admin.
 */
adminRouter.post('/', handlerAdmin.createAdmin)

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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string", "lastname": "string", "firstname": "string", "description" : "", avatar: "Oui" }
    *      responses:
    *        200:
    *          description: Update admin of given id.
    */
adminRouter.put('/:id', handlerAdmin.updateAdmin)

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
adminRouter.delete('/:id', handlerAdmin.deleteAdmin)