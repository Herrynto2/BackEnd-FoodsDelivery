//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem, checkItem, checkItemID, checkOutItem } = require('../controllers/transaction')
const { checktoken } = require('../middleware/authmiddleware')

app.patch("/topup", checktoken, topUp); //User General : Top Up
app.post("/carts/:id", checktoken, saveCart); //User General : Save items to Cart
app.get("/carts", checktoken, checkItem); //User General : Check lits item in the cart
app.get("/cart/:id", checktoken, checkItemID); //User General : Check item in the cart
app.delete("/carts/:id", checktoken, delItem); //User General : Delete Items
app.post("/checkout/:id", checktoken, checkOutItem); //User General : Checkout



module.exports = { transaction: app }