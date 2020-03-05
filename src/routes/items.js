const user = require('express').Router
const app = user()
const { pagination, getItems, addItem, editItem, deleteItem } = require('../controllers/items')

//SELECT ALL data user
app.get('/', pagination);

//Select Items
app.get('/:id', getItems);
app.get('/', getItems);

//Add Items
app.post("/", addItem);

//Edit Items
app.patch("/:id", editItem);

//Delete Items
app.delete("/", deleteItem);

module.exports = { user: app }