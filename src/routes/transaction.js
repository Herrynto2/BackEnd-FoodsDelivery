//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, listcart } = require('../controllers/transaction')

//Save items to Cart
app.post("/savecart", saveCart);

// //Search item as id at Cart
// app.get("/cart/:id", listcart);

//Top Up
app.patch("/topup/:id", topUp);

// // //DELETE data user 
// app.delete("/delete", deleteItem);


module.exports = { transaction: app }