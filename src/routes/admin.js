//Import express
const user = require('express').Router
const app = user()
const { getUser, getAllUser, postUser, patchUser, deleteUser } = require('../controllers/admin')

///////////////////////////Query JSON///////////////////////////////
//SELECT ALL data user
// app.get('/', getAllUser);

//SELECT data user where id
// app.get('/:id', getUser);

//CREATE data user
app.post("/", postUser);

// //EDIT data user
app.patch("/:id", patchUser);

// //DELETE data user 
app.delete("/", deleteUser);

module.exports = { user: app }