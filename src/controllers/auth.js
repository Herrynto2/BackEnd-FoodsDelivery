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
const getPost = async(req, res) => {
    const { username, password, name, email } = req.body
    try {
        const create = await user.create(username, password, name, email)
        console.log(create)
        if (create) {
            res.send({ success: true, msg: 'User has been created' })
        } else {
            res.send({ success: false, msg: 'Failed to create user' })
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