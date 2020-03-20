const { conn, connquery } = require('../config/db')
const user = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const upload = require('../middleware/upload')

//Login
const login = async(req, res, next) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const dataLogin = await new Promise((resolve, reject) => {
                connquery(`SELECT * FROM users WHERE username='${username}' || password='${password}'; SELECT userdetail.id_user, userdetail.name_user, userdetail.images, userdetail.work, userdetail.address, users.updated_at  from userdetail JOIN users on userdetail.id_user=users.id_user where users.username='${username}'`,
                    (err, results) => {
                        if (results[1][0].is_verified === 0) {
                            reject(new Error(err || 'Please verified your account first'))
                        } else if (!err && results[1].length > 0 && bcrypt.compareSync(password, results[1][0].password)) {
                            const name_user = results[2][0].name_user
                            const images = results[2][0].images
                            const work = results[2][0].work
                            const address = results[2][0].address
                            const id_user = results[2][0].id_user
                            const updated_at = results[2][0].updated_at
                            const userData = { username, id: results[1][0].id_user, name_user, images, work, address, id_user, updated_at }
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
                    token,
                    username,
                    id_user: dataLogin.id_user,
                    name_user: dataLogin.name_user,
                    images: dataLogin.images,
                    work: dataLogin.work,
                    address: dataLogin.address,
                    updated_at: dataLogin.updated_at

                }
            })
        } else {
            throw new Error('Username and Password is Required')
        }
    } catch (e) {
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
        var validasiHuruf = /^[a-z1-9]+$/
        if (username.match(validasiHuruf) && username.length > 6) {
            const create = await user.create(username, password, name, email, gender, address, work)
            if (create) {
                res.send({ success: true, msg: 'Registration success', Verification_codes: create })
            } else {
                res.send({ success: false, msg: 'Data already available' })
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
    const iduser = req.auth.id
    const { id } = req.params
    try {
        const detail = await user.get(id, iduser)
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
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//change profile user
const changeProfile = async(req, res) => {
    try {
        await upload(req, res, 'images')
        req.body.images = '/uploads/' + req.file.filename
        const { id } = req.params
        const key = Object.keys(req.body)
        const params = key.map((v, i) => {
            if (v && (key[i] === 'name_user' || key[i] === 'email' || key[i] === 'gender' || key[i] === 'address' || key[i] === 'work' || key[i] === 'images')) {
                if (req.body[key[i]]) {
                    return { keys: key[i], value: req.body[key[i]] }
                } else {
                    return null
                }
            } else {
                return null
            }
        }).filter(o => o)

        const iduser = req.auth.id
        const update = await user.change(id, iduser, params, req.body.images)
        if (update) {
            res.send({ success: true, msg: `User profile id ${iduser} has been updated` })
        } else {
            res.send({ success: false, msg: 'Failed to change profile' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Delete Profile User
const delProfile = async(req, res) => {
    const { id } = req.params
    const del = await user.delete(id)
    if (del) {
        res.send({ success: true, Message: `delete ID :${id} success` })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}



module.exports = { login, regist, Verify, forgotPass, changeProfile, delProfile, getProfile }