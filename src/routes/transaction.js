//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem, checkItem } = require('../controllers/transaction')

//Save items to Cart
app.post("/savecart", saveCart);

//Top Up
app.patch("/topup/:id", topUp);

//Delelete Item in cart
app.delete("/delete", delItem);

//Check Item in cart
app.get("/cart", checkItem);
app.get("/cart/:id", checkItem);


module.exports = { transaction: app }