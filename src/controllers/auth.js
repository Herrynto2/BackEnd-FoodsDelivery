const { conn, connquery } = require('../config/db')
const user = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

//Login
const login = async(req, res, next) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const dataLogin = await new Promise((resolve, reject) => {
                connquery(`SELECT * FROM users WHERE username='${username}' || password='${password}'`,
                    (err, results) => {
                        if (results[1][0].is_verified === 0) {
                            reject(new Error(err || 'Please verified your account first'))
                        } else if (!err && results[1].length > 0 && bcrypt.compareSync(password, results[1][0].password)) {
                            const userData = { username, id: results[1][0].id_user }
                            resolve(userData)
                        } else {
                            reject(new Error(err || 'Username or Password Wrong'))
                        }
                    })
            })
            const token = jwt.sign(dataLogin, process.env.APP_KEY, { expiresIn: '1D' })
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
                res.send({ success: false, msg: 'Character lenght must be 6-15' })
            }
        } else {
            res.send({ success: false, msg: 'Failed to registration' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Registration Verify
const Verify = async(req, res, next) => {
    try {
        if (!req.query.code) {
            throw new Error('Required Query code')
            console.log(req.query.code)
        }
        const verify = await user.verifyUser(req.query.code)

        if (verify) {
            res.status(200).send({
                success: true,
                msg: 'Your Account successfully verified'
            })
        } else {
            throw new Error('Failed to Verify Your Account')
        }
    } catch (e) {
        console.log(e)
        res.status(202).send({
            success: false,
            msg: e.message
        })
    }
}

//Forgot the password
const forgotPass = async(req, res) => {
    const { username, newpassword, confirmpassword } = req.body
    try {
        const update = await user.update(username, newpassword, confirmpassword)
        console.log(newpassword)
        if (newpassword == confirmpassword) {
            if (update) {
                res.send({ success: true, msg: 'Data available', verification_code: update })
            } else {
                res.send({ success: false, msg: 'failed to registration' })
            }
        } else {
            res.send({ success: false, msg: 'new password and confirm password must be same' })
        }

    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//get profile user
const getProfile = async(req, res) => {
    const { id } = req.params
    if (parseInt(id) === parseInt(req.auth.id)) {
        const detail = await user.get(id)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                message: 'Failed'
            })
        }
    } else {
        res.send({
            success: false,
            message: 'Unvalid User Id'
        })
    }

}

//change profile user
const changeProfile = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'name_user' || key[i] === 'email' || key[i] === 'gender' || key[i] === 'address' || key[i] === 'work')) {
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
        if (parseInt(id) === parseInt(req.auth.id)) {
            const update = await user.change(id, params)
            if (update) {
                res.send({ success: true, msg: `User profile id ${id} has been updated` })
            } else {
                res.send({ success: false, msg: 'Failed to change profile' })
            }
        } else {
            res.send({ success: false, msg: 'User id is unvalid' })
        }

    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Delete Profile User
const delProfile = async(req, res) => {
    const { id } = req.body
    const del = await user.delete(id)
    if (del) {
        res.send({ success: true, Message: `delete ID :${id} success` })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}



module.exports = { login, regist, Verify, forgotPass, changeProfile, delProfile, getProfile }