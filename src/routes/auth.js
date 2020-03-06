const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAuth, login, regist, forgot, changeData, deleteUser, regVerify } = require('../controllers/auth')

//Authentic
auth.post('/authen', getAuth)

//Register
auth.post('/register', regist)
auth.patch('/register/:id', regVerify)


//login
auth.get('/login', login)

//forgotpassword
auth.patch('/forgot', forgot)

//change data user
auth.patch('/', changeData)

//Delete user
auth.delete('/deleteuser', deleteUser)

module.exports = { auth }