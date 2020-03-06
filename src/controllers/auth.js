const { conn, connquery } = require('../config/db')
const user = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

//Authentication Static
const getAuth = (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        if ((username === 'admin') && (password === 'root')) {
            const data = { email: 'herry@gmail.com' } //payload
            const token = jwt.sign(data, process.env.APP_KEY, { expiresIn: '60m' })
            res.send({
                success: true,
                msg: 'Login success',
                data: { token }
            })
        }
        res.send({
            success: false,
            msg: 'Login failed'
        })
    }
}

//Login
const login = async(req, res, next) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const dataLogin = await new Promise((resolve, reject) => {
                connquery(`SELECT id, username, password FROM users WHERE username='${username}'`,
                    (err, results) => {
                        if (!err && results[1].length > 0 && bcrypt.compareSync(password, results[1][0].password)) {
                            const userData = { username }
                            resolve(userData)
                        } else {
                            reject(new Error(err || 'Username Or Password Wrong'))
                        }
                    })
            })
            const token = jwt.sign(dataLogin, process.env.APP_KEY, { expiresIn: '1H' })
            res.send({
                success: true,
                msg: 'Login Success',
                data: {
                    token
                }
            })
        } else {
            throw new Error('Username and Password is Required')
        }
    } catch (e) {
        console.log(e)
        res.status(401).send({
            success: false,
            msg: e.message
        })
    }
}

//Registration
const regist = async(req, res) => {
    const { username, password, name, email, gender, address, work } = req.body
    try {
        var validasiHuruf = /^[a-z1-9]+$/;
        if (username.match(validasiHuruf) && username.length <= 15 && username.length >= 6) {
            const create = await user.create(username, password, name, email, gender, address, work)
            if (create) {
                res.send({ success: true, msg: 'Registration success', Verification_codes: create })
            } else {
                res.send({ success: false, msg: 'Failed to registration' })
            }
        } else {
            res.send({ success: false, msg: 'Failed to registration' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Registration Verify
const regVerify = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'is_verified' || key[i] === 'verification_code')) {
            console.log(key[i])
            if (req.body[key[i]]) {
                return { keys: key[i], value: req.body[key[i]] }
            } else {
                return null
            }
        } else {
            return null
        }
    }).filter(o => o)
    try {
        const update = await user.verifyreg(id, params)
        if (update) {
            res.send({ success: true, msg: `verify success` })
        } else {
            res.send({ success: false, msg: 'Failed success' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Forgot the password
const forgot = async(req, res) => {
    const { username, password } = req.body
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

//change data user
const changeProfile = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'name_user' || key[i] === 'email' || key[i] === 'gender' || key[i] === 'address' || key[i] === 'work')) {
            console.log(key[i])
            if (req.body[key[i]]) {
                return { keys: key[i], value: req.body[key[i]] }
            } else {
                return null
            }
        } else {
            return null
        }
    }).filter(o => o)
    try {
        const update = await user.change(id, params)
        if (update) {
            res.send({ success: true, msg: `User profile id ${id} has been updated` })
        } else {
            res.send({ success: false, msg: 'Failed to change profile' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Delete User
const deleteUser = async(req, res) => {
    const { id } = req.body
    const del = await user.delete(id)
    if (del) {
        res.send({ success: true, Message: `delete data user ID :${id} success` })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}

// const postUser = async(req, res) => {
//     const { name_item, price } = req.body
//     try {
//         const create = await user.creates(name_item, price)
//         console.log(create)
//         if (create) {
//             res.send({ success: true, msg: 'User has been created' })
//         } else {
//             res.send({ success: false, msg: 'Failed to create user' })
//         }
//     } catch (error) {
//         res.send({ success: false, msg: error })
//     }
// }


module.exports = { getAuth, login, regist, regVerify, forgot, changeProfile, deleteUser }