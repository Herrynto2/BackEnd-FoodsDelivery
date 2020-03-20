//Import Express
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()


//Import MiddleWare
// app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*')
    next();
});

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//Database connection and table create
const { user } = require('./src/routes/items')
const { users } = require('./src/routes/resto')
const { transaction } = require('./src/routes/transaction')
const { guest } = require('./src/routes/guest')
const { migration } = require('./src/routes/migration')
const { auth } = require('./src/routes/auth')

app.use('/migrate', migration)
app.use('/', auth)
app.use('/', user)
app.use('/', users)
app.use('/', transaction)
app.use('/', guest)

//Define Port Server
app.listen(3000, () => {
    console.log("Server at running port 3000")
})