const Joi = require("joi");
const bcrypt = require("bcryptjs");

const BaseController = require("../base");
const UserModel = require("../../models/users");
const express = require("express");
const ValidationError = require("../../helpers/errors/validation");
const { checkPassword } = require("../../helpers/bcrypt");
const { createToken } = require("../../helpers/jwt");
const router = express.Router();

const users = new UserModel();
const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi
        .string().min(8).required()
        .pattern(passwordpattern)
        .messages({
            "string.min": `Password must length be at lease {#limit} charters long`,
            "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (i.e. !@#$%^&*)`,
        }),
});
const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

class AuthController extends BaseController {
    constructor(model) {
        super(model);
        router.post("/signin", this.validation(signInSchema), this.signIn);
        router.post("/signup", this.validation(signUpSchema), this.signUp);
    }

    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.model.getOne({ where: { email } });
            if (!user) {
                throw new ValidationError("User not found");
            }
            const isMatch = await checkPassword(password, user.password);
            if (!isMatch) {
                return next(new ValidationError("Wrong password"));
            }
            const token = createToken({ id: user.id });


            return res.status(200).json(this.apiSend({
                code: 200,
                status: "success",
                message: "Sign in successfully",
                data: {
                    user: {
                        ...user,
                        id: undefined,
                        password: undefined,
                    },
                    token
                }

            }, res));
        } catch (e) {
            next(new ServerError(e));
        }
    }

    signUp = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.model.getOne({ where: { email } });
            if (user) {
                return next(new ValidationError("User already exists"));
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.model.set({
                email,
                password: hashedPassword,
                role: "user"
            });
            const userResponse = {
                email: newUser.email,
            };

            // Send a success response
            return res.status(200).json(this.apiSend({
                code: 200,
                status: "success",
                message: "Sign up successfully",
                data: {
                    user: userResponse,
                    role: newUser.role
                }
            }, res));

        } catch (e) {
            next(new ServerError(e));
        }
    }

}
new AuthController(users);
module.exports = router;