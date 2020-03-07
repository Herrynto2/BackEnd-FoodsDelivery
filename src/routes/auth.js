const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { checktoken } = require('../middleware/authmiddleware')
const { login, regist, forgotPass, changeProfile, delProfile, regVerify, getProfile } = require('../controllers/auth')

//Register & verify
auth.post('/register', regist)
auth.patch('/verify', regVerify)

//login
auth.post('/login', login)

//forgotpassword
auth.patch('/forgot-password', forgotPass)

auth.get('/profile/get/:id', checktoken, getProfile); //User General : Display the user profile
auth.patch('/profile/:id', checktoken, changeProfile) //User General : Change profile
auth.delete('/profile', checktoken, delProfile) //User General : delete Profile

module.exports = { auth }