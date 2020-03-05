//Import Express
const express = require('express')
const app = express()

//Import MiddleWare
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//Database connection and table create
const { user } = require('./src/routes/admin')
const { users } = require('./src/routes/resto')
const { migration } = require('./src/routes/migration')
const { auth } = require('./src/routes/auth')
const { checktoken } = require('./src/middleware/authmiddleware')

app.use('/migrate', migration)
app.use('/auth', auth)
app.use('/user', checktoken, user)
app.use('/users', checktoken, users)

//Define Port Server
app.listen(3000, () => {
    console.log("Server at running port 3000")
})