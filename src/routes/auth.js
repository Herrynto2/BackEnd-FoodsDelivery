const auth = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAuth, getPost } = require('../controllers/auth')

//Register
auth.post('/login', getPost)

module.exports = { auth }