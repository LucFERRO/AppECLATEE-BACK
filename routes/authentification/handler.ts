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
            message = "Wrong password for this mail.";
            return res.status(401).json({ successfullLogin: false, message: message });
        } else {
            message = "Good";
            const accessToken = jwt.sign(
                { name: user.mail },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15s" }
            );
            const refreshToken = jwt.sign(
                { name: user.mail },
                process.env.REFRESH_TOKEN_SECRET
            );
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})

            // Token.findOne({ where: { mail: user.mail } }).then(
            //     (token: tokenTypes) => {
            //         if (token !== null) {
            //             // Token.destroy({where: { mail: user.mail },})
            //             Token.destroy({where: { userId: user.id },})
            //             // .then(() => {
            //                 // const message = `Token successfully DELETED.`;
            //                 // res.json({message, data: token })
            //                 // return res
            //                 //     .status(200)
            //                 //     .json({
            //                 //         successfullLogin: true,
            //                 //         userId: user.id,
            //                 //         accessToken: accessToken,
            //                 //         refreshToken: refreshToken,
            //                 //     });
            //             // });
            //             // const message = "Requested token does not exist.";
            //             // return res.status(404).json({ message });
            //         }

            //         Token.create({
            //             refreshToken : refreshToken,
            //             mail : user.mail,
            //             userId : user.id
            //         }).then((token: tokenTypes) => {
            //             const message: string = `Refresh token successfully replaced.`;
            //             // res.json({ message, data: token });
            //             return res
            //             .status(200)
            //             .json({
            //                 successfullLogin: true,
            //                 userId: user.id,
            //                 accessToken: accessToken,
            //                 refreshToken: refreshToken,
            //                 message: message,
            //                 oldToken: token,
            //             });
            //         })
                    // A VOIR ?

                    // //   User.update({
                    // //     tokenId : truc
                    // // }, {
                    // //   where: { id: user.id },
                    // // })

                    // //TEJ LE VIEUX
                    // //REMPLACER PAR NOUVEAU TOKEN REFRESH
                    // // })
                    // // .catch((error : ApiException ) => {
                    // //   const message = "Cannot find token."
                    // //   res.status(500).json({message, data: error})
                    // // })
                    // return res.status(200).json({ successfullLogin : true, userId : user.id , accessToken : accessToken, refreshToken : refreshToken })
                    // })
                    // .catch((error : ApiException) => {
                    //         const message = `Could not get users list.`
                    //         res.status(500).json({message : message, data : error})
                    //     });
            //     }
            // );
        }
    })
};


const refreshToken = (req : Request, res : Response) => {

    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)

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
            const accessToken = jwt.sign({name: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
            res.json({accessToken: accessToken})
            })
        })
};



export const handlerAuthentification = {
    login,
    refreshToken
}