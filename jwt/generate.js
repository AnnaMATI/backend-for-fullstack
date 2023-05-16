const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET;

function generateAccessToken(name,role){
    return jwt.sign({name,role},SECRET,{expiresIn:'36000s'} )
}

module.exports = {
    generateAccessToken
}
