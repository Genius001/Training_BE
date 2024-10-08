const BaseModel = require("./index");

class OrderModel extends BaseModel {

    constructor() {
        super("orders");
        this.select = {
            id: true,
            user_id: true,
            car_id: true,
            status: true,
            createdDt: true
        }
    }
}

module.exports = OrderModel