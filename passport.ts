const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

import { userTypes } from "./types/user";
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../database/connect')

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY,
    algorithms: ['RS256']
}

const strategy = new JwtStrategy(options, (payload : any, done : any) => {

    User.findOne({ id: payload.sub})
        .then((user : userTypes) => {
            if (user) return done(null, user)
            else done (null, false)
        })
        .catch((err : any) => done(err, null))
});

module.exports = (passport : any) => {
    passport.use(strategy)
}