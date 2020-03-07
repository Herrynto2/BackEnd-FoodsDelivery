const user = require('express').Router
const app = user()
const { pagination, getItems, addItem, editItem, deleteItem, addCategory } = require('../controllers/items')

app.get('/', pagination);
app.get('/:id', getItems);
app.get('/', getItems);
app.post("/user/restaurant/items", addItem); //Add item : Admin
app.patch("/user/restaurant/items/:id", editItem); //Edit Item : Admin
app.delete("/user/restaurant/items/delete", deleteItem); //Delete item : Admin

module.exports = { user: app }