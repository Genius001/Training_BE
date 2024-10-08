const controllers = require("../controllers");

controllers.cars = require("../controllers/cars");
controllers.users = require("../controllers/users");

module.exports = function (app) {
    app.use('/api/v1/cars', controllers.cars);
    app.use('/api/v1/users', controllers.users);
    app.use('/api/v1/auth', controllers.auth);
};