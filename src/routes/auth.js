const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAuth, getPost, getLog, getChange } = require('../controllers/auth')

//Register
auth.post('/register', getPost)

//login
auth.get('/login', getLog)

//forgotpassword
auth.patch('/', getChange)


module.exports = { auth }