const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport')

import { userTypes } from "../types/user";

const jwt = require('jsonwebtoken')

const { User } = require('./connect')

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY,
}

passport.use( new JwtStrategy(options, function (jwt_payload : any, done : (arg0: null, arg1: boolean) => any){
    console.log(jwt_payload)
    User.findOne({ where: { id: jwt_payload.id } })
        .then( (user : boolean) => {
            if (!user) return done(null, false)
            done(null, user)
        })
        .catch( (error: any) => done(null, error) )
}))