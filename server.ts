require('dotenv').config()

const cors = require('cors')
const express = require("express")

const app = express()

app.use(cors())

import { ApiException } from './types/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import {Response, Request} from 'express'

app.use(express.json())


// To make database, comment otherwise.
sequelize.initDb()

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
            title: 'TITLE',
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
    apis: [`./routes/*/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

require('./routes/users/createUser')(app)
require('./routes/users/findUserByPk')(app)
require('./routes/users/findAllUsers')(app)
require('./routes/users/updateUser')(app)
require('./routes/users/deleteUser')(app)

require('./routes/companies/findAllCompanies')(app)

require('./routes/candidates/findAllCandidates')(app)

require('./routes/admins/findAllAdmins')(app)

app.use(({res : ApiException}: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({message})
})