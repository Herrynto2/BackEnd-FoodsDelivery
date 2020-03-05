//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem, checkItem, checkItems, checkOutItem } = require('../controllers/transaction')

//Save items to Cart
app.post("/savecart", saveCart);

//Top Up
app.patch("/topup/:id", topUp);

//Delete Item in cart
app.delete("/delete", delItem);

//Check Item in cart
app.get("/cart", checkItems);
app.get("/cart", checkItem);
app.get("/cart/:id", checkItem);

//Checkout
app.get("/checkout", checkOutItem);



module.exports = { transaction: app }