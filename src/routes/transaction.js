//Import express
const user = require('express').Router
const app = user()
const { topUp, saveCart, delItem, checkItem, checkOutItem, addReview } = require('../controllers/transaction')
const { checktoken } = require('../middleware/authmiddleware')

app.patch("/topup/:id", checktoken, topUp); //User General : Top Up
app.post("/carts/items", checktoken, saveCart); //User General : Save items to Cart
app.get("/carts/:id", checktoken, checkItem); //User General : Check lits item in the cart
app.delete("/carts/delete/:id", checktoken, delItem); //User General : Delete Items
app.post("/review/:id", checktoken, addReview); //User General : Give Review item
app.get("/review/:id", checktoken, addReview); //User General : Give Review item


//Checkout
app.get("/user/checkout", checkOutItem);



module.exports = { transaction: app }