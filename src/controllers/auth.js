const user = require('../models/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Register
const getAuth = (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        if ((username === 'admin') && (password === 'root')) {
            const data = { email: 'herry@gmail.com' } //payload
            const token = jwt.sign(data, process.env.APP_KEY, { expiresIn: '60m' })
            res.send({
                success: true,
                msg: 'Login admin success',
                data: { token }
            })
        }
        res.send({
            success: false,
            msg: 'Login failed'
        })
    }
}

//Registration
const getPost = async(req, res) => {
    const { username, password, name, email, gender, work } = req.body
    try {
        //Username validation : character must be <=15, smallword and can using number
        var validasiHuruf = /^[a-z1-9]+$/;
        if (username.match(validasiHuruf) && username.length <= 15) {
            const create = await user.create(username, password, name, email, gender, work)
            if (create) {
                res.send({ success: true, msg: 'Registration success' })
            } else {
                res.send({ success: false, msg: 'Failed to registration' })
            }
        } else {
            res.send({ success: false, msg: 'Failed' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}


// //Login
// const getLogin = function(req, res) {
//     const { username, password } = req.body
//     conn.query(`SELECT * FROM foodsdata where username = ${username}`, (error, rows, fields) => {
//         if (error) {
//             console.log(error)
//         } else {
//             response.ok(rows, res)
//         }
//     })
// }
module.exports = { getAuth, getPost }