import { Request, Response } from "express";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");

const { Company, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllCompanies = (req : Request, res : Response) => {
    Company.findAll({include: [User]})
    .then((companies: companyTypes) => {
        res.status(200).json((DTO(companies)));
    })
    .catch((error: ApiException) => {
        res.status(500).json(error);
    });
}

const getCompanyById = async (req : Request, res : Response) => {
    Company.findOne({
        where: {user_id : req.params.id}, 
        include: [User]
    })
        .then((company: companyTypes) => {
            if (company === null) {
                const message = "Requested company does not exist.";
                return res.status(404).json({ message });
            }

            res.status(200).json(DTO(company));
        })
        .catch((error: ApiException) => {
            const message = "Cannot find company.";
            res.status(500).json({ message, data: error });
        });
};

const createCompany = async (req : Request, res : Response) => {

    if (!req.body.password)
    return res.status(400).json({
        passwordRequired: true,
        message: "Password is required.",
    });

    const { name, siret, password, mail, city, zip_code, address, phone_number, is_active, is_pending } = req.body;

    let role = 'entreprise'

    let companyInfo = { name, siret }
    let userInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role }
    let hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
        await sequelize.transaction(async (t : any) => {
        const newUser = await User.create(
            { ...userInfo, password: hashedPassword },
            { transaction: t }
        )

        companyInfo = Object.assign(companyInfo, { user_id: newUser.user_id });

        const newCompany = await Company.create(companyInfo, { transaction: t })
        return res.status(200).json(newCompany)
        })
    } catch (error) {
        res.status(500).json('ERROR 500')
    }
}

const updateCompany = async (req : Request, res : Response) => {
    const id = req.params.id;

    const { name, siret, mail, city, zip_code, address, phone_number, is_active, is_pending, role } = req.body;

    let companyInfo = { name, siret };
    let userInfo = { mail, city, zip_code, address, phone_number, is_active, is_pending, role };

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        userInfo = Object.assign(userInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t : any) => {
            const updatedCompany: any = await Company.update(
                companyInfo,
                {
                    where: { id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await User.update(userInfo, {
                where: { user_id: updatedCompany[1].user_id },
                returning: true,
                plain: true,
                transaction: t,
            });
            return res.status(200).json(updatedCompany[1]);
        });
    } catch (error) {
        return res.status(500).json("ERROR 500");
    }
}

const deleteCompany = (req : Request, res : Response) => {
    Company.findByPk(req.params.id)
        .then((company: companyTypes) => {
            if (company === null) {
                const message = "Requested user does not exist.";
                return res.status(404).json({ message: message });
            }

            const deletedCompany = company;
            return Company.destroy({
                where: { id: company.user_id },
            }).then(() => {
                const message = `Company ${deletedCompany.user_id} successfully deleted.`;
                res.json({ message, data: deletedCompany });
            });
        })
        .catch((error: ApiException) => {
            const message = `Could not delete company.`;
            res.status(500).json({ message, data: error });
        });
}


export const handlerCompany = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}