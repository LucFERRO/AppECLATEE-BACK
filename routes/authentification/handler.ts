import { Request, RequestHandler, Response } from "express";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
import { tokenTypes } from "../../types/token";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Token } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const login = (req : Request, res : Response) => {
    User.findOne({where: {mail : req.body.mail}})
    .then(async (user: userTypes) => {
        let message: string = "";

        if (user == null) {
            message = "Aucun utilisateur ne correspond à ce mail.";
            return res.status(400).json({ userFound: false, message: message });
        }
        if (await !bcrypt.compare(req.body.password, user.password)) {
            message = "Identifiants incorrects.";
            return res.status(401).json({ successfullLogin: false, message: message });
        } else {
            const accessToken = jwt.sign(
                { name: user.mail },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15s" }
            );
            const refreshToken = jwt.sign(
                { name: user.mail },
                process.env.REFRESH_TOKEN_SECRET
            );


            Token.findOne({ where: { user_id: user.user_id } })
            .then((token: tokenTypes) => {
                    if (token !== null) Token.destroy({where: { user_id: user.user_id }})

                    Token.create({
                        refreshToken : refreshToken,
                        user_id : user.user_id
                    })
                })
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
        }
    })
};

const refreshToken = (req : Request, res : Response) => {

    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(400)

    Token.findAll()
    .then((tokens: any) => {
        let refreshTokens : any = []

        tokens.map((token : tokenTypes) => {
            refreshTokens.push(token.refreshToken)
        })

        console.log('All tokens',refreshTokens)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err : Error, user : any) => {
            if (err) return res.sendStatus(403)
            const accessToken = jwt.sign({name: user.mail}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
            res.json({accessToken: accessToken})
            })
        })
};

export const handlerAuthentification = {
    login,
    refreshToken
}