const Joi = require("joi");

const BaseController = require("../base");
const UserModel = require("../../models/users");
const express = require("express");
const ValidationError = require("../../helpers/errors/validation");
const router = express.Router();

const users = new UserModel();

const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    avatar: Joi.string().uri().allow(null),
    phone_number: Joi.string().required(),
    driver_license: Joi.string().allow(null),
    birthdate: Joi.date().allow(null),
});

class UsersController extends BaseController {
    constructor(model) {
        super(model);
        router.get("/", this.getAll);
        router.post("/", this.validation(userSchema), this.checkUnique, this.create);
        router.get("/:id", this.get);
        router.put("/:id", this.validation(userSchema), this.checkUnique, this.update);
        router.delete("/:id", this.delete);

    }

    checkUnique = async (req, res, next) => {
        const checkUnique = await this.model.getOne({
            where: {
                OR: [
                    {
                        email: req.body.email
                    },
                    {
                        phone_number: req.body.phone_number
                    },
                ],
            },
            select: {
                email: true,
                phone_number: true
            }
        })
        if (checkUnique) {
            return next(new ValidationError("Email or Phone number already exists"));

            next()
        }
    }
}
new UsersController(users);
module.exports = router;