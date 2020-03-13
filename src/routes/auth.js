const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const { login, regist, forgotPass, changeProfile, delProfile, Verify, getProfile } = require('../controllers/auth')

//Register & verify
auth.post('/register', regist)
auth.patch('/verify', Verify)

//login
auth.post('/login', login)

//forgotpassword
auth.patch('/forgot-password', forgotPass)
auth.patch('/verify', Verify)

//already
auth.get('/profile', checktoken, getProfile); //User General : Display the user profile
auth.patch('/profile', checktoken, changeProfile) //User General : Change profile
auth.delete('/profile/:id', checktoken, checkPermission.superadmin, delProfile) //Super Admin : delete Profile
    //



module.exports = { auth }