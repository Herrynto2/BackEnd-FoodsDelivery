//Import express
const user = require('express').Router
const app = user()
const { getUser, getResto, getAllUser, postUser, patchUser, deleteUser } = require('../controllers/resto')

//SELECT ALL data 
app.get('/', getAllUser);

//Select ALL Resto
app.get('/', getResto);

//SELECT data detail
app.get('/:id', getUser);

//CREATE data user
app.post("/", postUser);

// //EDIT data user
app.patch("/:id", patchUser);

// //DELETE data user 
app.delete("/", deleteUser);

module.exports = { users: app }