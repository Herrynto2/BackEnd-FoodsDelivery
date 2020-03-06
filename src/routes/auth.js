const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAuth, login, regist, forgot, changeProfile, deleteUser, regVerify } = require('../controllers/auth')

//Authentic
auth.post('/authen', getAuth)

//Register & verify
auth.post('/register', regist)
auth.patch('/register/:id', regVerify)

//login
auth.get('/login', login)

//forgotpassword
auth.patch('/forgot', forgot)

//Chenge profile user
auth.patch('/profile/:id', changeProfile)

//Delete user
auth.delete('/deleteuser', deleteUser)

module.exports = { auth }