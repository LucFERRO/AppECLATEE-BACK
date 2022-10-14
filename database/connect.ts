import { DataTypes } from "sequelize"
const { Sequelize } = require('sequelize')

import { userTypes } from "../types/user"
let users = require('../database/mock-user')
const UserModel = require('../models/users')

import { companyTypes } from "../types/company"
let companies = require('../database/mock-company')
const CompanyModel = require('../models/companies')

import { candidateTypes } from "../types/candidate"
let candidates = require('../database/mock-candidate')
const CandidateModel = require('../models/candidates')

import { adminTypes } from "../types/admin"
let admins = require('../database/mock-admin')
const AdminModel = require('../models/admins')

const sequelize = new Sequelize (
    'ECLATEEtest',
    'neo',
    'neoneo',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        }
    }
)

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error : Error) => console.error(`Could not connect to database: ${error}`)
    )

const User = UserModel(sequelize, DataTypes)
const Company = CompanyModel(sequelize, DataTypes)
const Candidate = CandidateModel(sequelize, DataTypes)
const Admin = AdminModel(sequelize, DataTypes)

const initDb = () => {

        // User.hasOne(Candidate , { constraints: false })
        // Candidate.belongsTo(User, { constraints: false })

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: userTypes) => {
                User.create({
                    // name: user.name,
                    mail: user.mail,
                    password: user.password,
                    zip_code: user.zip_code,
                    city: user.city,
                    phone_number: user.phone_number,
                    is_active: user.is_active,
                    role: user.role

                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            companies.map((company: companyTypes) => {
                Company.create({
                    name: company.name,
                    siret: company.siret
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            candidates.map((candidate: candidateTypes) => {
                Candidate.create({
                    lastname: candidate.lastname,
                    firstname: candidate.firstname,
                    birthdate: candidate.birthdate
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            admins.map((admin: adminTypes) => {
                Admin.create({
                    lastname: admin.lastname,
                    firstname: admin.firstname,
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            console.log('Database successfully initialized.')
    })
}


module.exports = {
    initDb, 
    User, 
    Company,
    Candidate,
    Admin
}