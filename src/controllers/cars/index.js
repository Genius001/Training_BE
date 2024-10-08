const Joi = require("joi");

const BaseController = require('../base')
const CarModel = require('../../models/cars')
const express = require("express");
const { authorize, checkRole } = require('../../middlewares/authorization')
const router = express.Router();

const cars = new CarModel();

const carSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    type: Joi.string(),
    manufactur: Joi.string().required(),
    isDriver: Joi.boolean().required(),
    img: Joi.string().uri().allow(null),
    description: Joi.string().allow(null),
    isAvailable: Joi.boolean(),
    licenseNumber: Joi.string(),
    seat: Joi.number().min(2),
    baggage: Joi.number(),
    transmission: Joi.string(),
    year: Joi.string(),
})

class CarsController extends BaseController {
    constructor(model) {
        super(model);
        router.get("/", this.getAll);
        router.post("/", this.validation(carSchema), authorize, checkRole(["admin"]), this.create);
        router.get("/:id", this.get);
        router.put("/:id", this.validation(carSchema), authorize, checkRole(["admin"]), this.update);
        router.delete("/:id", this.delete);
    }
}

new CarsController(cars);
module.exports = router;