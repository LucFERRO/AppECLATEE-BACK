import { Request, Response } from "express";
import { ApiException } from "../../types/exception";
import { adminTypes } from "../../types/admin";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");

const { Admin, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllAdmins = (req : Request, res : Response) => {
    Admin.findAll({include: [User]})
    .then((admins: adminTypes) => {
        res.status(200).json((DTO(admins)));
    })
    .catch((error: ApiException) => {
        res.status(500).json(error);
    });
}

const getAdminById = async (req : Request, res : Response) => {
    Admin.findOne({
        where: {id : req.params.id}, 
        include: [User]
    })
        .then((admin: adminTypes) => {
            if (admin === null) {
                const message = "Requested admin does not exist.";
                return res.status(404).json({ message });
            }

            res.status(200).json(DTO(admin));
        })
        .catch((error: ApiException) => {
            const message = "Cannot find admin.";
            res.status(500).json({ message, data: error });
        });
};

const createAdmin = async (req : Request, res : Response) => {

    if (!req.body.password)
    return res.status(400).json({
        passwordRequired: true,
        message: "Password is required.",
    });

    const { lastname, firstname, password, mail, city, zip_code, address, phone_number, is_active, is_pending } = req.body;

    let role = 'admin'

    let adminInfo = { lastname, firstname }
    let userInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role }
    let hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
        await sequelize.transaction(async (t : any) => {
        const newUser = await User.create(
            { ...userInfo, password: hashedPassword },
            { transaction: t }
        )

        adminInfo = Object.assign(adminInfo, { user_id: newUser.user_id });
        // Heritage "user_id = id"

        const newAdmin = await Admin.create(adminInfo, { transaction: t })
        return res.status(200).json(newAdmin)
        })
    } catch (error) {
        res.status(500).json('ERROR 500')
    }
}

const updateAdmin = async (req : Request, res : Response) => {
    const id = req.params.id;

    const { lastname, firstname, mail, city, zip_code, address, phone_number, is_active, is_pending, role } = req.body;

    let adminInfo = { lastname, firstname };
    let userInfo = { mail, city, zip_code, address, phone_number, is_active, is_pending, role };

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        userInfo = Object.assign(userInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t : any) => {
            const updatedAdmin: any = await Admin.update(
                adminInfo,
                {
                    where: { id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await User.update(userInfo, {
                where: { user_id: updatedAdmin[1].user_id },
                returning: true,
                plain: true,
                transaction: t,
            });
            return res.status(200).json(updatedAdmin[1]);
        });
    } catch (error) {
        return res.status(500).json("ERROR 500");
    }
}

const deleteAdmin = (req : Request, res : Response) => {
    Admin.findByPk(req.params.id)
        .then((admin: adminTypes) => {
            if (admin === null) {
                const message = "Requested user does not exist.";
                return res.status(404).json({ message: message });
            }

            const deletedAdmin = admin;
            return Admin.destroy({
                where: { id: admin.id },
            }).then(() => {
                const message = `Admin ${deletedAdmin.id} successfully deleted.`;
                res.json({ message, data: deletedAdmin });
            });
        })
        .catch((error: ApiException) => {
            const message = `Could not delete admin.`;
            res.status(500).json({ message, data: error });
        });
}


export const handlerAdmin = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
}