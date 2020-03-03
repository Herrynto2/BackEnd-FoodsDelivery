//Import Express
const express = require('express')
const app = express()

//Database and table connection
const { migration } = require('./src/routes/migration')
app.use('/migrate', migration)

//Testing
app.get('/', function(req, res) {
    res.send('Koneksi berhasil');
})

//Define Port Server
app.listen(3000, () => {
    console.log("Server at running port 3000")
})