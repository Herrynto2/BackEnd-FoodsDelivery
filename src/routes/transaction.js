//Import express
const user = require('express').Router
const app = user()
const { topup } = require('../controllers/transaction')

// //SELECT ALL data 
// app.get('/', getAllUser);

// //Select ALL Resto
// app.get('/', getResto);

// //SELECT data detail
// app.get('/:id', getUser);

// //CREATE data user
// app.post("/", postUser);

// //EDIT data user
app.patch("/:id", topup);

// // //DELETE data user 
// app.delete("/", deleteUser);

module.exports = { transaction: app }