const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

auth.post('/login', (req, res) => {
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
})
module.exports = { auth }