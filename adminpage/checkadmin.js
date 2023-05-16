const jwt = require("jsonwebtoken");

function checkAdmin(req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    return decoded.role === 1;
}

module.exports = { checkAdmin }
