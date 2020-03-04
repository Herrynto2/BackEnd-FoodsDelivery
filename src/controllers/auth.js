const conn = require('../config/db')
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

//Forgot the password
const getChange = async(req, res) => {
    const { username, password, email } = req.body
    try {
        const update = await user.update(username, password)
        console.log(update)
        if (update) {
            res.send({ success: true, msg: 'Updated success' })
        } else {
            res.send({ success: false, msg: 'failed to registration' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}





// const getChange = async(req, res) => {
//     const { id } = req.params
//     const key = Object.keys(req.body)
//     const params = key.map((v, i) => {
//         if (v && (key[i] === 'username' || key[i] === 'password')) {
//             if (req.body[key[i]]) {
//                 return { keys: key[i], value: req.body[key[i]] }
//             } else {
//                 return null
//             }
//         } else {
//             return null
//         }
//     }).filter(o => o)
//     try {
//         const update = await user.update(id, params)
//         if (update) {
//             res.send({ success: true, msg: `user id ${id} has been updated` })
//         } else {
//             res.send({ success: false, msg: 'Failed to update user' })
//         }
//     } catch (error) {
//         res.send({ success: false, msg: 'Error' })
//     }
// }

//
// updateUser = function(req, res) {

//     var id = req.body.id;
//     var email = req.body.email;
//     var password = req.body.password;

//     connection.query('UPDATE  users SET password = ? WHERE id = ?', [password, id],
//         function(error, rows, fields) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 response.ok("Berhasil merubah user!", res)
//             }
//         });
// }

//Login still fail
const getLog = async(req, res) => {
    const { username, password } = req.params
    const detail = await user.get(username)
    console.log(username)
    if (detail) {
        res.send({
            success: true,
            data: detail
        })
    } else {
        res.send({
            success: false,
            data: detail
        })
    }
}



// getLog2 = function(req, res) {
//     var username = req.params.username;
//     conn.query(`SELECT * FROM person where username = '${username}'`, [user_id],
//         function(error, rows, fields) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 response.ok(rows, res)
//             }
//         });
// };


module.exports = { getAuth, getPost, getLog, getChange }