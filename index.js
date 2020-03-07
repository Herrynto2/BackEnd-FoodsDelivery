//Import Express
const express = require('express')
const app = express()

//Import MiddleWare
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//Database connection and table create
const { user } = require('./src/routes/items')
const { users } = require('./src/routes/resto')
const { transaction } = require('./src/routes/transaction')
const { migration } = require('./src/routes/migration')
const { auth } = require('./src/routes/auth')
const { checktoken } = require('./src/middleware/authmiddleware')

app.use('/migrate', migration)
app.use('/', auth)
app.use('/', user)
app.use('/', users)
app.use('/', transaction)

//Define Port Server
app.listen(3000, () => {
    console.log("Server at running port 3000")
})