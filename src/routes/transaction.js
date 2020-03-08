//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem, checkItem, checkOutItem } = require('../controllers/transaction')
const { checktoken } = require('../middleware/authmiddleware')

app.patch("/topup/:id", checktoken, topUp); //User General : Top Up
app.post("/carts/:id", checktoken, saveCart); //User General : Save items to Cart
app.get("/carts/:id", checktoken, checkItem); //User General : Check lits item in the cart
app.delete("/carts/:id", checktoken, delItem); //User General : Delete Items
app.post("/checkout/:id", checktoken, checkOutItem); //User General : Checkout



module.exports = { transaction: app }