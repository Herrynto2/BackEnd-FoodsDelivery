const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAuth, login, regist, forgot, changeData, postUser } = require('../controllers/auth')

//Authentic
auth.post('/authen', getAuth)

//Register
auth.post('/register', postUser)

//login
auth.get('/login', login)

//forgotpassword
auth.patch('/forgot', forgot)

//change data user
auth.patch('/', changeData)

module.exports = { auth }