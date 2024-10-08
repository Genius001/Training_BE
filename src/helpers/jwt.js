const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

function createToken(payload) {
    return jwt.sign(payload, SECRET, {
        expiresIn: '1800s'
    });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    createToken,
    verifyToken
}