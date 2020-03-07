//Middleware berfungsi untuk checking kevalidan token saat login
const jwt = require('jsonwebtoken')
require('dotenv').config()

function checktoken(req, res, next) {
    let token = req.headers.authorization || "" //type bearer
    if (token.startsWith('Bearer')) {
        //ambil token dari index ke 7
        token = token.slice(7, token.length)
    } else {
        res.send({
            success: false,
            msg: 'Please login first'
        })
    }
    //checking kevalidan jwt
    try {
        req.auth = jwt.verify(token, process.env.APP_KEY)
        console.log(req.auth)
        next()
    } catch (error) {
        res.send({
            success: false,
            msg: error.message
        })
    }
}
module.exports = { checktoken }