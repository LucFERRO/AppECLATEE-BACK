require('dotenv').config()
require('./database/passport')

const cors = require('cors')
const express = require("express")

const app = express()
const router = express.Router()

app.use(cors())
app.use('/api', router)

import { ApiException } from './types/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import { candidateRouter } from './routes/candidates/router'
import { userRouter } from './routes/users/router'
import { companyRouter } from './routes/companies/router'
import { adminRouter } from './routes/admins/router'

import {Response, Request} from 'express'
const passport = require('passport')

app.use(express.json())
app.use(passport.initialize())

// To make database, comment otherwise.
// sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})

app.get("/", (req : Request, res : Response) => {
    res.send("SWAGGER : /api/docs")
})
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'TITRE',
            description: 'DESCRIPTION',
            contact: {
                name: 'Best front-end dev EUW'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:${port}`,
                description: 'localhost'
            },],
        },
    },
    apis: [`./routes/*/router.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

router.use('/users', userRouter)
router.use('/candidates', candidateRouter)
router.use('/companies', companyRouter)
router.use('/admins', adminRouter)

// require('./routes/availabilities/findAllAvailabilities')(app)

// require('./routes/auth/login')(app)
// require('./routes/auth/test')(app)

app.use(({res : ApiException}: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({message})
})