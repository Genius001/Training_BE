const { verifyToken } = require("../helpers/jwt");
const UserModel = require("../models/users");
const User = new UserModel();

async function authorize(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(401).json({ message: "Unauthorized" });
        const token = bearerToken.split(' ')[1];
        const payload = verifyToken(token);

        req.user = await User.getById(payload.id);

        next();
    } catch (e) {
        next(e);
    }
}

function checkRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return res.status(403).json({ message: "Forbidden" });
        next();
    }
}

module.exports = { authorize, checkRole }