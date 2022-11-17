import { DataTypes } from "sequelize"
const { Sequelize } = require('sequelize')

import { userTypes } from "../types/user"
let users = require('../database/mocks/mock-user')
const UserModel = require('../models/users')

import { companyTypes } from "../types/company"
let companies = require('../database/mocks/mock-company')
const CompanyModel = require('../models/companies')

import { candidateTypes } from "../types/candidate"
let candidates = require('../database/mocks/mock-candidate')
const CandidateModel = require('../models/candidates')

import { adminTypes } from "../types/admin"
let admins = require('../database/mocks/mock-admin')
const AdminModel = require('../models/admins')

import { tokenTypes } from "../types/token"
let tokens = require('../database/mocks/mock-token')
const TokenModel = require('../models/tokens')


import { availabilityTypes } from "../types/availability"
let availabilities = require('../database/mocks/mock-availability')
const AvailabilityModel = require('../models/availabilities')

import sequelize from './sequelize'

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error: Error) => console.error(`Could not connect to database: ${error}`)
    )

const User = UserModel(sequelize, DataTypes)
const Company = CompanyModel(sequelize, DataTypes)
const Candidate = CandidateModel(sequelize, DataTypes)
const Admin = AdminModel(sequelize, DataTypes)
const Token = TokenModel(sequelize, DataTypes)
const Availability = AvailabilityModel(sequelize, DataTypes)

User.hasOne(Candidate, { foreignKey: 'user_id' })
Candidate.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(Company, { foreignKey: 'user_id' })
Company.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(Admin, { foreignKey: 'user_id' })
Admin.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(Token, { foreignKey: 'user_id' })
Token.belongsTo(User, { foreignKey: 'user_id' })

const initDb = () => {

    return sequelize.sync({ force: true }).then(() => {

        users.map((user: userTypes) => {
            User.create({
                mail: user.mail,
                password: user.password,
                is_active: user.is_active,
                is_pending: user.is_pending,
                is_to_be_completed: user.is_to_be_completed,
                role: user.role,
                zip_code: user.zip_code,
                city: user.city,
                address: user.address,
                phone_number: user.phone_number,
                description: user.description,
                avatar: user.avatar
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        companies.map((company: companyTypes) => {
            Company.create({
                user_id: company.user_id,
                name: company.name,
                siret: company.siret,
                availabilities: company.availabilities,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        candidates.map((candidate: candidateTypes) => {
            Candidate.create({
                user_id: candidate.user_id,
                lastname: candidate.lastname,
                firstname: candidate.firstname,
                birthdate: candidate.birthdate,
                availabilities: candidate.availabilities,
                degrees: candidate.degrees,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        admins.map((admin: adminTypes) => {
            Admin.create({
                user_id: admin.user_id,
                lastname: admin.lastname,
                firstname: admin.firstname
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        tokens.map((token: tokenTypes) => {
            Token.create({
                user_id: token.user_id,
                refreshToken: token.refreshToken
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        availabilities.map((availability: availabilityTypes) => {
            Availability.create({
                availability: availability.availability
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
    Admin,
    Token,
    Availability
}