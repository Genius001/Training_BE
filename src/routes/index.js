const controllers = require("../controllers");

controllers.cars = require("../controllers/cars");
controllers.users = require("../controllers/users");
controllers.auth = require("../controllers/auth");
controllers.orders = require("../controllers/orders");
controllers.upload = require("../controllers/upload");

module.exports = function (app) {
    app.use('/api/v1/cars', controllers.cars);
    app.use('/api/v1/users', controllers.users);
    app.use('/api/v1/auth', controllers.auth);
    app.use('/api/v1/orders', controllers.orders);
    app.use('/api/v1/upload', controllers.upload);
};