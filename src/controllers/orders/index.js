const Joi = require("joi");

const BaseController = require('../base')
const OrderModel = require('../../models/orders')
const express = require("express");
const router = express.Router();

const orders = new OrderModel();

const orderSchema = Joi.object({
    user_id: Joi.number().required(),
    car_id: Joi.number().required(),
    status: Joi.string().required(),
});

class OrderController extends BaseController {
    constructor(model) {
        super(model)
        router.get("/", this.getAll)
        router.post("/", this.validation(orderSchema), this.create)
        router.get("/:id", this.get)
        router.put("/:id", this.validation(orderSchema), this.update)
        router.delete("/:id", this.delete)
    }
}