//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem } = require('../controllers/transaction')

//Save items to Cart
app.post("/savecart", saveCart);

// //Search item as id in Cart
// app.get("/cart/:id", listcart);

//Top Up
app.patch("/topup/:id", topUp);

//Delelete Item in cart
app.delete("/delete", delItem);


module.exports = { transaction: app }