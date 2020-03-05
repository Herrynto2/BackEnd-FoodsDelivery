const { connquery } = require('../config/db')
const user = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
const getLog = async(req, res, next) => {
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




module.exports = { getAuth, getPost, getLog, getChange }