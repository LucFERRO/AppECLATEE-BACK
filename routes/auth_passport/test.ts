import { application, Application } from 'express'
import { ApiException } from '../../types/exception'
import { userTypes } from '../../types/user'
const { User } = require('../../database/connect')
const passport = require('passport')


/**
  * @openapi
  * /api/test:
  *  post:
  *      tags: [Login]
  *      description: Test
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *      responses:
  *        200:
  *          description: Test.
  */
module.exports = (app: Application) => {
    app.get('/api/test', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'TEST OK'
        })
    })
}