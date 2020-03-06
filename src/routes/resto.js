//Import express
const user = require('express').Router
const app = user()
const { pagination, getResto, addResto, editResto, deleteResto } = require('../controllers/resto')

app.get('/', getResto);
app.get('/:id', getResto);
app.post("/", addResto);
app.patch("/:id", editResto);
app.delete("/", deleteResto);

module.exports = { users: app }