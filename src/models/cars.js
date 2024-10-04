const BaseModel = require('./index');
//inheritance
class CarModel extends BaseModel {
    constructor() {
        super('cars');
        this.select = {
            id: true,
            name: true,
            year: true,
            type: true,
            manufactur: true,
            price: true,
            img: true,
        };
    };
};

module.exports = new CarModel()