const BaseModel = require("./index");
class UserModel extends BaseModel {
    constructor() {
        super("users");
        this.select = {
            id: true,
            fullname: true,
            email: true,
            password: true
        }
    }
}
module.exports = UserModel